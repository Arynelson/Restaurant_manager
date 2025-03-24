import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewOrderModal from '../components/NewOrderModal';

export default function ClientOrders() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [summary, setSummary] = useState(null); // FIX: dentro do componente

  const fetchClient = async () => {
    const res = await fetch(`http://localhost:8000/customers/${id}`);
    const data = await res.json();
    setClient(data);
  };

  const fetchOrders = async () => {
    let url = `http://localhost:8000/orders?customer_id=${id}`;
    if (statusFilter !== 'all') {
      url += `&status=${statusFilter}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    setOrders(data);
  };

  const fetchSummary = async () => {
    const res = await fetch(`http://localhost:8000/customers/${id}/orders/summary`);
    if (res.ok) {
      const data = await res.json();
      setSummary(data);
    }
  };

  useEffect(() => {
    fetchClient();
    fetchSummary();
  }, [id]);

  useEffect(() => {
    fetchOrders();
  }, [id, statusFilter]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{client?.name}</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Novo Pedido
        </button>
      </div>

      {/* 🟦 Dashboard cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-xl shadow">
            <h3 className="text-sm text-gray-500">Total de Pedidos</h3>
            <p className="text-xl font-bold">{summary.total_orders}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-xl shadow">
            <h3 className="text-sm text-gray-500">Valor Total</h3>
            <p className="text-xl font-bold">R$ {summary.total_amount.toFixed(2)}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-xl shadow space-y-1">
            {Object.entries(summary.status_counts).map(([status, count]) => (
              <div key={status} className="flex justify-between">
                <span className="capitalize">{status}</span>
                <span>
                  {count} pedidos | R$ {summary.status_amounts[status].toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtro */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filtrar por status:</label>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="all">Todos</option>
          <option value="pending">Pendente</option>
          <option value="paid">Pago</option>
          <option value="cancelled">Cancelado</option>
        </select>
      </div>

      {/* Lista de pedidos */}
      <ul className="space-y-2">
        {orders.map(order => (
          <li key={order.id} className="border p-4 rounded">
            <div className="font-semibold">{order.description}</div>
            <div>R$ {order.amount.toFixed(2)}</div>
            <div>{new Date(order.created_at).toLocaleDateString()}</div>
            <div
              className={`inline-block px-2 py-1 text-xs rounded-full ${
                order.status === 'paid'
                  ? 'bg-green-200 text-green-800'
                  : order.status === 'cancelled'
                  ? 'bg-red-200 text-red-800'
                  : 'bg-yellow-200 text-yellow-800'
              }`}
            >
              {order.status}
            </div>
          </li>
        ))}
      </ul>

      <NewOrderModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        customerId={parseInt(id)}
        onOrderCreated={() => {
          fetchOrders();
          fetchSummary(); // Atualiza cards
        }}
      />
    </div>
  );
}
