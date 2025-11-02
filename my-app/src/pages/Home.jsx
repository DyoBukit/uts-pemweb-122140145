import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import GameGrid from "../components/GameGrid";
import DetailModal from "../components/DetailModal";
import api from "../utils/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [platforms, setPlatforms] = useState({
    pc: false,
    playstation: false,
    xbox: false,
  });
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [sortBy, setSortBy] = useState("rating");
  const [page, setPage] = useState(1);

  const platformIds = { pc: 4, playstation: 18, xbox: 1 };

  const handleSearch = (text) => {
    if (!text.trim()) {
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

        const selectedPlatforms = Object.keys(platforms).filter(
          (k) => platforms[k]
        );
        const activePlatforms =
          selectedPlatforms.length > 0
            ? selectedPlatforms.map((k) => platformIds[k]).join(",")
            : Object.values(platformIds).join(",");

        const ordering = sortBy === "rating" ? "-rating" : "-released";

        const res = await api.get("/games", {
          params: {
            search: query,
            page,
            page_size: 24,
            platforms: activePlatforms,
            ordering,
          },
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
    <div className="min-h-screen flex flex-col items-center ">
      <div className="w-full max-w-6xl mt-8">
        <Header />
        <SearchForm
          onSearch={handleSearch}
          platforms={platforms}
          setPlatforms={setPlatforms}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {error && <p className="text-red-400 mt-4">{error}</p>}
      {loading && <p className="text-gray-400 mt-4">Memuat data...</p>}

      <div className="w-full mt-8">
        <GameGrid games={games} onSelect={openDetail} />
        {games.length > 0 && (
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                page === 1
                  ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
              }`}
            >
              Prev
            </button>

            <span className="text-indigo-300 font-semibold">Page {page}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition"
            >
              Next
            </button>
          </div>
        )}

      </div>

      <footer className="mt-10 mb-7 text-indigo-300 text-sm text-center">
        UTS Pengembangan Aplikasi Web — Game Database (RAWG API)
      </footer>

      {selectedGame && (
        <DetailModal
          gameId={selectedGame.id}
          onClose={closeDetail}
          initial={selectedGame}
        />
      )}
    </div>
  );
}
