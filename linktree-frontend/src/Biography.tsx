import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BiographyPage: React.FC = () => {
  const [biography, setBiography] = useState<string>("");
  const navigate = useNavigate(); // Use useNavigate instead of Next.js router
  const userId = localStorage.getItem("userId"); // Get userId from localStorage

  useEffect(() => {
    const fetchBiography = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:5000/users/${userId}/biography`);
        const data = await response.json();

        if (!response.ok) {
          alert(`Error: ${data.error || "Could not fetch biography"}`);
          return;
        }

        setBiography(data.biography || "");
      } catch (error) {
        console.error("Failed to fetch biography", error);
        alert("Error fetching biography");
      }
    };

    fetchBiography();
  }, [userId]);

  const handleSaveBiography = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/biography`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ biography }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Error: ${data.error || "Could not update biography"}`);
        return;
      }

      alert("Biography updated successfully!");
      navigate("/linktree"); // Navigate back to LinkTree page
    } catch (error) {
      console.error("Failed to update biography", error);
      alert("Error updating biography");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow rounded-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Edit Biography</h1>
        <textarea
          className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          placeholder="Write your biography here..."
        />
        <div className="mt-4">
          <button
            onClick={handleSaveBiography}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save Biography
          </button>
        </div>
      </div>
    </div>
  );
};

export default BiographyPage;
