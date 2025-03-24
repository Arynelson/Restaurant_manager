// frontend/src/pages/Orders.jsx
import { useEffect, useState } from 'react';
import OrderItem from '../components/OrderItem';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      // Buscando pedidos para teste (exemplo: customer_id=1)
      const response = await fetch('http://localhost:8000/orders?customer_id=1');
      const data = await response.json();
      setOrders(data);
    }
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Meus Pedidos</h2>
      {orders.length === 0 ? (
        <p>Não há pedidos para exibir.</p>
      ) : (
        orders.map(order => (
          <OrderItem key={order.id} order={order} />
        ))
      )}
    </div>
  );
}
