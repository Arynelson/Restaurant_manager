// frontend/src/pages/Menu.jsx
import { useEffect, useState } from 'react';
import MenuItemCard from "../components/MenuItemCard";
import Cart from "../components/Cart";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [mesa, setMesa] = useState(1); // estado para número da mesa (de 1 a 99)
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchMenu() {
      const response = await fetch('http://localhost:8000/menuitems');
      const data = await response.json();
      setMenuItems(data);
    }
    fetchMenu();
  }, []);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(cartItem => cartItem.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prev => {
      if (newQuantity <= 0) {
        return prev.filter(cartItem => cartItem.id !== itemId);
      }
      return prev.map(cartItem =>
        cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
      );
    });
  };

  const checkout = async () => {
    if (cartItems.length === 0) {
      alert("Mesa sem itens! Selecione os itens da mesa.");
      return;
    }
    // Monta a descrição e soma os totais
    const description = cartItems.map(item => item.name).join(", ");
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const orderData = {
      description,
      amount: totalAmount,
      status: "pending",
      customer_id: 1, // para testes, você pode ajustar conforme necessário
      table_number: mesa  // inclui o número da mesa
    };

    try {
      const response = await fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error("Erro ao finalizar o pedido");
      }
      alert("Pedido finalizado com sucesso!");
      setCartItems([]);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Cardápio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map(item => (
          <MenuItemCard key={item.id} item={item} onAddToCart={() => addToCart(item)} />
        ))}
      </div>
      <div className="mt-8">
        {/* Renomeamos "Cart" para "Mesa" visualmente */}
        <h3 className="text-xl font-bold mb-4">Mesa</h3>
        <div className="mb-4">
          <label className="mr-2 font-semibold">Número da Mesa (1-99):</label>
          <input 
            type="number" 
            min="1" 
            max="99" 
            value={mesa} 
            onChange={(e) => setMesa(Number(e.target.value))} 
            className="border p-2 rounded w-20"
          />
        </div>
        <Cart 
          cartItems={cartItems} 
          onRemoveItem={removeFromCart} 
          onUpdateQuantity={updateQuantity} 
        />
        <button
          onClick={checkout}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}
