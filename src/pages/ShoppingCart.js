import React from 'react';

const ShoppingCart = ({ cart, removeFromCart, updateQuantity }) => {
  return (
    <div>
      <h2>Carrinho de Compras</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <div>
            <span>{item.name} : </span>
            <span>
              Preço: {typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}
            </span>
          </div>
          <div>
            <button onClick={() => updateQuantity(item, -1)} disabled={item.quantity <= 0}>
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item, 1)}>+</button>
            <button onClick={() => removeFromCart(item)}>Remover</button>
            <span>
              Preço: {typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;
