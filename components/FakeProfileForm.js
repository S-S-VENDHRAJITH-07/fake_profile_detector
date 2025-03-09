"use client";
import { useState } from "react";
import { toast } from 'react-toastify';

const FakeProfileForm = () => {
  const [profileUrl, setProfileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [recentSearches, setRecentSearches] = useState(['@john_doe', '@jane_smith', '@tech_guru']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Example data that would come from profile URL/username analysis
      const profileData = {
        id: 999,
        name: "FakeUser123",
        statuses_count: 5,
        followers_count: 10,
        friends_count: 1000,
        favourites_count: 2,
        listed_count: 0,
        geo_enabled: 0,
        profile_use_background_image: 0,
        lang: "en"
      };

      // Send to prediction API
      const response = await fetch('http://localhost:3000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze profile');
      }

      const data = await response.json();
      setResult(data[0]);
      
      // Add to recent searches if not already present
      if (!recentSearches.includes(profileUrl)) {
        setRecentSearches(prev => [profileUrl, ...prev.slice(0, 2)]);
      }
      
      toast.success('Profile analyzed successfully!');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to analyze profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-cyan-400 mb-8">Try & Analyse a Profile</h2>
      
      {/* Platform Selection */}
      <div className="flex gap-4 mb-8">
        <button className="flex items-center gap-2 px-6 py-2 bg-[#1877F2]/20 text-[#1877F2] rounded-lg hover:bg-[#1877F2]/30 transition-colors">
          <span className="text-lg">f</span>
          Facebook
        </button>
        <button className="flex items-center gap-2 px-6 py-2 bg-[#0A66C2]/20 text-[#0A66C2] rounded-lg hover:bg-[#0A66C2]/30 transition-colors">
          <span className="text-lg">in</span>
          LinkedIn
        </button>
        <button className="flex items-center gap-2 px-6 py-2 bg-[#E4405F]/20 text-[#E4405F] rounded-lg hover:bg-[#E4405F]/30 transition-colors">
          <span className="text-lg">📸</span>
          Instagram
        </button>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            placeholder="Enter profile URL or username..."
            className="w-full p-4 pr-32 bg-black/50 text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500 placeholder:text-gray-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? 'Analyzing...' : 'Analyze ⚡'}
          </button>
        </div>
      </form>

      {/* Recent Searches */}
      <div className="mb-8">
        <h3 className="text-gray-400 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Recent Searches
        </h3>
        <div className="flex gap-2">
          {recentSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => setProfileUrl(search)}
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 transition-colors text-sm"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Result */}
      {result && (
        <div className="mt-8 p-6 border border-[#333333] rounded-lg bg-black/30">
          <h3 className="text-xl font-semibold text-white mb-4">Analysis Result</h3>
          <div className="space-y-2">
            <p className="text-gray-300">Profile ID: {result.id}</p>
            <p className="text-gray-300">Username: {result.name}</p>
            <p className="text-gray-300">
              Result: {result.Predicted_isFake[0] === 1 ? (
                <span className="text-red-500 font-semibold">Likely Fake</span>
              ) : (
                <span className="text-green-500 font-semibold">Likely Genuine</span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FakeProfileForm;
