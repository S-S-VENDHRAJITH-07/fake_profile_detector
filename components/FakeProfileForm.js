"use client";
import { useState } from "react";

export default function FakeProfileForm({ setResult }) {
  const [profileData, setProfileData] = useState({
    username: "",
    followers: "",
    following: "",
    posts: "",
    bio: "",
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulated API call (Replace with actual AI model backend)
    setTimeout(() => {
      const fakeProbability = Math.random() * 100; // Simulated AI response
      setResult({ probability: fakeProbability.toFixed(2) });
    }, 2000);
  };

  return (
    <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">🔍 Enter Profile Details</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        className="w-full p-2 mb-3 border rounded"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="followers"
        placeholder="Followers Count"
        className="w-full p-2 mb-3 border rounded"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="following"
        placeholder="Following Count"
        className="w-full p-2 mb-3 border rounded"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="posts"
        placeholder="Number of Posts"
        className="w-full p-2 mb-3 border rounded"
        onChange={handleChange}
        required
      />
      <textarea
        name="bio"
        placeholder="Profile Bio (Optional)"
        className="w-full p-2 mb-3 border rounded"
        onChange={handleChange}
      />

      <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">
        Analyze Profile
      </button>
    </form>
  );
}
