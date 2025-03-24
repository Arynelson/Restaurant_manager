// frontend/src/components/OrderItem.jsx
import { Link } from "react-router-dom";

export default function OrderItem({ order, onStatusUpdated }) {
  const markAsDelivered = async () => {
    if (window.confirm("Marcar pedido como entregue (pago)?")) {
      try {
        const response = await fetch(`http://localhost:8000/orders/${order.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: order.description,
            amount: order.amount,
            status: "paid",
            customer_id: order.customer ? order.customer.id : 1
          })
        });
        if (!response.ok) throw new Error("Erro ao atualizar o pedido");
        const updatedOrder = await response.json();
        alert("Pedido marcado como entregue (pago) com sucesso!");
        if (onStatusUpdated) onStatusUpdated(updatedOrder);
      } catch (error) {
        alert("Erro: " + error.message);
      }
    }
  };

  return (
    <div className="border p-4 rounded my-2 flex justify-between items-center">
      <div>
        <h3 className="font-bold">{order.description}</h3>
        <p>Status: {order.status}</p>
        <p>Valor: R$ {order.amount.toFixed(2)}</p>
      </div>
      <div className="flex gap-2">
        <Link 
          to={`/order/${order.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ver Detalhes
        </Link>
        {order.status !== "paid" && (
          <button 
            onClick={markAsDelivered}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Pedido Entregue
          </button>
        )}
      </div>
    </div>
  );
}
