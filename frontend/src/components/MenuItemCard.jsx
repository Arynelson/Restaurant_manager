// frontend/src/components/MenuItemCard.jsx
export default function MenuItemCard({ item, onAddToCart }) {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
        <div className="mt-2 font-bold">R$ {item.price.toFixed(2)}</div>
        <button
          onClick={onAddToCart}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
