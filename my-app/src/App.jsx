import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import GameGrid from "./components/GameGrid";
import DetailModal from "./components/DetailModal";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export default function App() {
  const [query, setQuery] = useState("");
  const [platforms, setPlatforms] = useState({
    pc: false,
    playstation: false,
    xbox: false
  });
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [sortBy, setSortBy] = useState("rating"); // or "released"
  const [page, setPage] = useState(1);

  // Build platform filter param (RAWG uses platform ids)
  const platformIds = {
    pc: 4,
    playstation: 18,
    xbox: 1
  };

  const handleSearch = async (searchText) => {
    if (!searchText || searchText.trim() === "") {
      setError("Masukkan nama game untuk mencari.");
      return;
    }
    setQuery(searchText);
    setPage(1);
  };

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        // compose platforms param if any checked
        const selected = Object.keys(platforms)
          .filter((k) => platforms[k])
          .map((k) => platformIds[k])
          .join(",");

        const ordering = sortBy === "rating" ? "-rating" : "-released";

        const url = new URL(`${BASE_URL}/games`);
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("search", query);
        url.searchParams.append("page", page);
        url.searchParams.append("page_size", 24);
        if (selected) url.searchParams.append("platforms", selected);
        if (ordering) url.searchParams.append("ordering", ordering);

        const res = await fetch(url.toString(), { signal: controller.signal });
        if (!res.ok) throw new Error("Gagal fetch data.");
        const data = await res.json();
        setGames(data.results || []);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
    return () => controller.abort();
  }, [query, platforms, sortBy, page]);

  const openDetail = (game) => setSelectedGame(game);
  const closeDetail = () => setSelectedGame(null);

  return (
    <div className="app">
      <Header />
      <main className="container">
        <SearchForm
          onSearch={handleSearch}
          platforms={platforms}
          setPlatforms={setPlatforms}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {error && <div className="error">{error}</div>}
        {loading && <div className="loading">Loading...</div>}

        <GameGrid games={games} onSelect={openDetail} />

        {/* simple pagination controls */}
        {games.length > 0 && (
          <div className="pagination">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
            <span>Page {page}</span>
            <button onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        )}

        {selectedGame && (
          <DetailModal gameId={selectedGame.id} onClose={closeDetail} initial={selectedGame} />
        )}
      </main>
      <footer className="footer">
        <p>UTS Pengembangan Aplikasi Web — Game Database (RAWG API)</p>
      </footer>
    </div>
  );
}
