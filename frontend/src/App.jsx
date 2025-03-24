// App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClientOrders from './pages/ClientOrders';
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu';
import Orders from './pages/Order';
import OrderDetail from './pages/OrderDetail';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients/:id/orders" element={<ClientOrders />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:orderId" element={<OrderDetail />} />
      </Routes>
    </>
  );
}
