export default function GameGrid({ games }) {
  if (!games.length)
    return (
      <p className="text-center text-gray-400 mt-6">
        Pilih jenis platform yang diinginkan dan lakukan pencarian game.
      </p>
    );

  return (
    <div className="w-full mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {games.map((game) => (
        <div
          key={game.id}
          className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
        >
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-56 object-cover"
          />
          <div className="p-3 text-center">
            <h3 className="font-semibold text-lg text-white truncate">
              {game.name}
            </h3>
            <p className="text-sm text-gray-400">
              ⭐ {game.rating} | {game.released}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}