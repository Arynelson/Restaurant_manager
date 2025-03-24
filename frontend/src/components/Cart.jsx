// frontend/src/components/Cart.jsx
import React from 'react';

export default function Cart({ cartItems, onRemoveItem, onUpdateQuantity }) {
  const total = cartItems.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0);
  
  return (
    <div className="p-4 border rounded shadow-md">
      <h3 className="text-xl font-bold mb-4">Carrinho</h3>
      {cartItems.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <ul>
          {cartItems.map((cartItem) => (
            <li key={cartItem.id} className="flex justify-between items-center mb-2">
              <span>
                {cartItem.name} (x{cartItem.quantity}) - R$ {(cartItem.price * cartItem.quantity).toFixed(2)}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity - 1)}
                  className="text-red-500"
                >
                  -
                </button>
                <button
                  onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
                  className="text-green-500"
                >
                  +
                </button>
                <button
                  onClick={() => onRemoveItem(cartItem.id)}
                  className="text-red-700"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 font-bold">Total: R$ {total.toFixed(2)}</div>
    </div>
  );
}
