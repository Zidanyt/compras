// PurchaseHistory.js
import React from 'react';

const PurchaseHistory = ({ purchaseHistory }) => {
  return (
    <div>
      <h2>Histórico de Compras</h2>
      <ul>
        {purchaseHistory.map((order, index) => (
          <li key={index}>
            <h3>Compra #{index + 1}</h3>
            <p>Total: R${order.total.toFixed(2)}</p>
            <ul>
              {order.cart.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.quantity} x {item.name} - R${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseHistory;
