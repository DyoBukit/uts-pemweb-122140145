export default function DetailModal({ gameId, detail, onClose }) {
  if (!detail) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center fade-in z-50 p-4">
      <div className="max-w-3xl w-full bg-white/10 border border-white/20 rounded-xl overflow-hidden shadow-2xl">
        
        <button onClick={onClose} className="absolute top-4 right-6 text-red-400 text-xl font-bold hover:text-red-300">✖</button>

        <img src={detail.background_image} className="w-full h-64 object-cover" />

        <div className="p-6 space-y-3">
          <h2 className="text-2xl font-bold text-blue-300">{detail.name}</h2>
          <p className="text-gray-300 text-sm leading-relaxed">{detail.description_raw}</p>
        </div>
      </div>
    </div>
  );
}