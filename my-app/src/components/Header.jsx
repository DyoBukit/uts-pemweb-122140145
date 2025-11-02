import React from "react";

export default function Header() {
  return (
    <header className="text-center mb-6">
      <h1 className="text-4xl font-bold text-slate-200 flex justify-center items-center gap-2">
        🎮 <span className="py-3 text-extrabold">Game Explorer</span> 🎮
      </h1>
      <p className="text-indigo-200 mt-2 text-lg">
        Temukan dan jelajahi game populer dari seluruh dunia.
      </p>
    </header>
  );
}