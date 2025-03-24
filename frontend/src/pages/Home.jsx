// frontend/src/pages/Home.jsx
import { useEffect, useState } from 'react';
import NewClientModal from '../components/NewClientModal';

export default function Home() {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchClients = async () => {
    const res = await fetch('http://localhost:8000/customers');
    const data = await res.json();
    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Novo Cliente
        </button>
      </div>
      <ul className="space-y-2">
        {clients.map(client => (
          <li key={client.id} className="border p-4 rounded">
            <h2 className="font-semibold">{client.name}</h2>
            <p>{client.email} | {client.phone}</p>
          </li>
        ))}
      </ul>
      <NewClientModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onClientCreated={fetchClients}
      />
    </div>
  );
}

