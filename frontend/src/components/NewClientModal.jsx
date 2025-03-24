// frontend/src/components/NewClientModal.jsx
import { useState } from 'react';

export default function NewClientModal({ isOpen, onClose, onClientCreated }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Erro ao criar cliente');
      onClientCreated();
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
        <h2 className="text-xl font-semibold">Novo Cliente</h2>
        <input
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="phone"
          placeholder="Telefone"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
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
