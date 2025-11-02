// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import GameGrid from "../components/GameGrid";
import DetailModal from "../components/DetailModal";
import api from "../utils/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [platforms, setPlatforms] = useState({ pc: false, playstation: false, xbox: false });
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [sortBy, setSortBy] = useState("rating");
  const [page, setPage] = useState(1);

  const platformIds = { pc: 4, playstation: 18, xbox: 1 };

  const handleSearch = (text) => {
    if (!text || !text.trim()) {
      setError("Masukkan nama game untuk mencari.");
      return;
    }
    setQuery(text.trim());
    setError(null);
  };

  useEffect(() => {
    if (!query) return;
    const fetchGames = async () => {
      try {
        setLoading(true);
        const selected = Object.keys(platforms)
          .filter((k) => platforms[k])
          .map((k) => platformIds[k])
          .join(",");
        const ordering = sortBy === "rating" ? "-rating" : "-released";
        const res = await api.get("/games", {
          params: { search: query, page, page_size: 24, platforms: selected, ordering },
        });
        setGames(res.data.results || []);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data game. Periksa API key atau koneksi.");
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, [query, platforms, sortBy, page]);

  const openDetail = (game) => setSelectedGame(game);
  const closeDetail = () => setSelectedGame(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">

      <div className="w-full max-w-3xl text-center px-6 py-10">
        <Header />
        <SearchForm
          onSearch={handleSearch}
          platforms={platforms}
          setPlatforms={setPlatforms}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        {error && <p className="text-red-400 mt-4">{error}</p>}
        {loading && <p className="text-gray-400 mt-4">Memuat data...</p>}

        <div className="mt-8">
          <GameGrid games={games} onSelect={openDetail} />
        </div>

        <footer className="mt-10 text-gray-500 text-sm">
          UTS Pengembangan Aplikasi Web — Game Database (RAWG API)
        </footer>
      </div>

      {selectedGame && (
        <DetailModal gameId={selectedGame.id} onClose={closeDetail} initial={selectedGame} />
      )}
    </div>
  );
}