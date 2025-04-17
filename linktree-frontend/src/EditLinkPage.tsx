import React, { useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditLinkPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the link ID from the route
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the link details when the component loads
    const fetchLinkDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/links/${id}`);
        const data = await response.json();

        if (!response.ok) {
          alert(`Error: ${data.error || "Could not fetch link details"}`);
          return;
        }

        setTitle(data.title);
        setUrl(data.url);
      } catch (error) {
        console.error("Failed to fetch link details", error);
        alert("Error fetching link details");
      } finally {
        setLoading(false);
      }
    };

    fetchLinkDetails();
  }, [id]);

  const handleUpdateLink = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/links/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url }),
      });
      const data = await response.json();

      if (!response.ok) {
        alert(`Error: ${data.error || "Could not update link"}`);
        return;
      }

      alert("Link updated successfully!");
      navigate("/"); // Redirect back to the main page
    } catch (error) {
      console.error("Failed to update link", error);
      alert("Error updating link");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading link details...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow rounded-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Edit Link</h1>
        <form onSubmit={handleUpdateLink} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Link Title:
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Link URL:
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Update Link
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 hover:text-gray-800 ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLinkPage;
