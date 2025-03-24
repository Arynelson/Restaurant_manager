// frontend/src/pages/OrderDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrder() {
      const response = await fetch(`http://localhost:8000/orders/${orderId}`);
      const data = await response.json();
      setOrder(data);
    }
    fetchOrder();
  }, [orderId]);

  if (!order) return <p>Carregando...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Detalhes do Pedido</h2>
      <p><strong>ID:</strong> {order.id}</p>
      <p><strong>Mesa:</strong> {order.table_number}</p>
      <p><strong>Descrição:</strong> {order.description}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Valor:</strong> R$ {order.amount.toFixed(2)}</p>
      <p><strong>Data:</strong> {new Date(order.created_at).toLocaleString()}</p>
      <button 
        onClick={() => navigate(-1)}
        className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Voltar
      </button>
    </div>
  );
}
