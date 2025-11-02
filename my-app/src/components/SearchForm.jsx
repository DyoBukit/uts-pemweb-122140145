import React, { useState } from "react";

export default function SearchForm({
  onSearch,
  platforms,
  setPlatforms,
  sortBy,
  setSortBy,
}) {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };

  const togglePlatform = (name) => {
    setPlatforms((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-5 bg-gray-800/80 p-6 rounded-2xl shadow-lg w-full max-w-7xl mx-auto"
    >
      <div className="flex w-full gap-3">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Cari game (contoh: GTA, Minecraft...)"
          className="flex-grow px-4 py-3 rounded-lg bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          Cari
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 text-gray-200">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={platforms.pc}
            onChange={() => togglePlatform("pc")}
            className="accent-indigo-500"
          />
          PC
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={platforms.playstation}
            onChange={() => togglePlatform("playstation")}
            className="accent-indigo-500"
          />
          PlayStation
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={platforms.xbox}
            onChange={() => togglePlatform("xbox")}
            className="accent-indigo-500"
          />
          Xbox
        </label>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-gray-300 font-medium">Urutkan:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-900 text-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="rating">Rating Tertinggi</option>
          <option value="released">Terbaru</option>
        </select>
      </div>
    </form>
  );
}
