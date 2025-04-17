import React, { useState, useEffect, FormEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface Link {
  id: number;
  title: string;
  url: string;
  createdAt: string;
}

const LinktreePage: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null); // State to store the logged-in user's ID
  const [title, setTitle] = useState<string>(""); // Title for the link
  const [url, setUrl] = useState<string>(""); // URL for the link
  const [links, setLinks] = useState<Link[]>([]); // Array of links
  const [editingLinkId, setEditingLinkId] = useState<number | null>(null); // Link currently being edited
  const [editedTitle, setEditedTitle] = useState<string>(""); // Temp title for editing
  const [editedUrl, setEditedUrl] = useState<string>(""); // Temp URL for editing  
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);


const handleFetchLinks = useCallback(async () => {
  if (!userId) return;
  try {
    const response = await fetch(`http://localhost:5000/users/${userId}/links`);
    const data = await response.json();

    if (!response.ok) {
      alert(`Error: ${data.error || "Could not fetch links"}`);
      return;
    }

    setLinks(data);
  } catch (error) {
    console.error("Failed to fetch links", error);
    alert("Error fetching links");
  }
}, [userId]);

const handleCreateLink = useCallback(
  async (e: FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    try {
      const response = await fetch("http://localhost:5000/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, title, url }),
      });
      const data = await response.json();

      if (!response.ok) {
        alert(`Error: ${data.error || "Could not create link"}`);
        return;
      }

      alert("Link created successfully!");
      handleFetchLinks();
      setTitle("");
      setUrl("");
    } catch (error) {
      console.error("Failed to create link", error);
      alert("Error creating link");
    }
  },
  [userId, title, url, handleFetchLinks] // Dependencies
);


  const handleDeleteLink = async (linkId: number) => {
    if (!userId) {
      alert("Please log in first to delete a link!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/links/${linkId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        alert(`Error: ${data.error || "Could not delete link"}`);
        return;
      }

      alert("Link deleted successfully!");
      setLinks(links.filter((link) => link.id !== linkId));
    } catch (error) {
      console.error("Failed to delete link", error);
      alert("Error deleting link");
    }
  };

  const handleEditLink = (link: Link) => {
    setEditingLinkId(link.id); // Set the link being edited
    setEditedTitle(link.title); // Prefill the editing form with the existing title
    setEditedUrl(link.url); // Prefill the editing form with the existing URL
  };

  const handleSaveEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingLinkId) return;

    try {
      const response = await fetch(`http://localhost:5000/links/${editingLinkId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editedTitle, url: editedUrl }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(`Error: ${data.error || "Could not update link"}`);
        return;
      }

      alert("Link updated successfully!");
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === editingLinkId ? { ...link, title: editedTitle, url: editedUrl } : link
        )
      );
      setEditingLinkId(null); // Exit edit mode
    } catch (error) {
      console.error("Failed to update link", error);
      alert("Error updating link");
    }
  };

  useEffect(() => {
    if (userId) {
      handleFetchLinks();
    }
  }, [userId, handleFetchLinks]); // Added handleFetchLinks

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow rounded-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Linktree Page</h1>
       {/* Navigate to Biography */}
       <button
          onClick={() => navigate("/biography")}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Edit Biography
        </button>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Link</h2>
          <form onSubmit={handleCreateLink} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
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
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
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
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Create Link
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Links</h2>
          {links.length > 0 ? (
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.id} className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center">
                  {editingLinkId === link.id ? (
                    <form onSubmit={handleSaveEdit} className="flex-grow space-y-2">
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="url"
                        value={editedUrl}
                        onChange={(e) => setEditedUrl(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="space-x-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingLinkId(null)}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex-grow">
                      <strong className="text-gray-800">{link.title}</strong> —{" "}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {link.url}
                      </a>
                    </div>
                  )}
                  <div className="space-x-2">
                    {editingLinkId !== link.id && (
                      <button
                        onClick={() => handleEditLink(link)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteLink(link.id)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 hover:text-gray-800"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No links available.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default LinktreePage;
