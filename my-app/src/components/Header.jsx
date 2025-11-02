import React from "react";

export default function Header() {
  return (
    <header className="text-center mb-6">
      <h1 className="text-4xl font-bold text-indigo-400 flex justify-center items-center gap-2">
        🎮 <span className="text-white">Game Explorer</span> 🎮
      </h1>
      <p className="text-gray-300 mt-2 text-lg">
        Temukan dan jelajahi game populer dari seluruh dunia.
      </p>
    </header>
  );
}