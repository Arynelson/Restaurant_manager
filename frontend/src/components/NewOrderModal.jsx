// frontend/src/components/NewOrderModal.jsx
import { useState } from 'react';

export default function NewOrderModal({ isOpen, onClose, customerId, onOrderCreated }) {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    status: 'pending',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          amount: parseFloat(form.amount),
          customer_id: customerId,
        }),
      });
      if (!res.ok) throw new Error('Erro ao criar pedido');
      onOrderCreated();
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl space-y-4"
      >
        <h2 className="text-xl font-semibold">Novo Pedido</h2>
        <input
          name="description"
          placeholder="Descrição"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="amount"
          type="number"
          placeholder="Valor"
          value={form.amount}
          onChange={handleChange}
          required
          step="0.01"
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="pending">Pendente</option>
          <option value="paid">Pago</option>
          <option value="cancelled">Cancelado</option>
        </select>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-black"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Salvando...' : 'Criar'}
          </button>
        </div>
      </form>
    </div>
  );
}
