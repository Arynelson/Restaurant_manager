// frontend/src/components/NavBar.jsx
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <ul className="flex gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        {/* Adicione mais links conforme necessário para o gestor */}
      </ul>
    </nav>
  );
}
