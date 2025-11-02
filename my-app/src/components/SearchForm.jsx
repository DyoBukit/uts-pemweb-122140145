import React, { useState } from "react";

export default function SearchForm({ onSearch, platforms, setPlatforms, sortBy, setSortBy }) {
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
      className="flex flex-col items-center gap-4 bg-gray-800/70 p-6 rounded-2xl shadow-lg w-full max-w-6xl"
    >

      <div className="flex w-full gap-2">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Cari game (contoh: GTA, Minecraft...)"
          className="flex-grow px-4 py-2 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          Cari
        </button>
      </div>

      <div className="flex gap-4 text-gray-200">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={platforms.pc}
            onChange={() => togglePlatform("pc")}
            className="accent-indigo-500"
          />
          PC
        </label>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={platforms.playstation}
            onChange={() => togglePlatform("playstation")}
            className="accent-indigo-500"
          />
          PlayStation
        </label>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={platforms.xbox}
            onChange={() => togglePlatform("xbox")}
            className="accent-indigo-500"
          />
          Xbox
        </label>
      </div>

      {/* Dropdown urutan */}
      <div className="flex items-center gap-2">
        <label className="text-gray-300 font-medium">Urutkan:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-800 text-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="rating">Rating Tertinggi</option>
          <option value="released">Terbaru</option>
        </select>
      </div>
    </form>
  );
}