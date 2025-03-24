
// frontend/src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie } from 'recharts';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      const response = await fetch("http://localhost:8000/orders/summary");
      const data = await response.json();
      setSummary(data);
    }
    fetchSummary();
  }, []);

  if (!summary) return <p>Carregando...</p>;

  const statusData = Object.keys(summary.status_counts).map(status => ({
    status,
    count: summary.status_counts[status],
    amount: summary.status_amounts[status]
  }));

  const averagePerTableData = summary.average_per_table || []; // Ex: [{ table_number: 1, average: 120.5 }, ...]
  const topItemsData = summary.top_items || []; // Ex: [{ name: "Tofu Bao", quantity: 15 }, ...]

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="mb-4">
        <p>Total de Pedidos: {summary.total_orders}</p>
        <p>Total em R$: {summary.total_amount.toFixed(2)}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Pedidos por Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Gasto Médio por Mesa</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={averagePerTableData}>
              <XAxis dataKey="table_number" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="average" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Itens Mais Vendidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                dataKey="quantity" 
                data={topItemsData} 
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                fill="#8884d8" 
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
