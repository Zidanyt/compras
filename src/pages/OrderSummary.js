import React, { useState } from 'react';
import Modal from 'react-modal';

const OrderSummary = ({ cart, total, clearCart, addToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const finalizePurchase = () => {
    clearCart();
    closeModal();
  };

  const addMoreProducts = () => {
    const exampleProduct = {
      id: 6,
      name: 'Produto 6',
      price: 60,
    };
    addToCart(exampleProduct);
  };

  return (
    <div>
      <h2>Resumo do Pedido</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} - Quantidade: {item.quantity} - R${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <button onClick={openModal}>Finalizar Compra</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Total da Compra"
      >
        <h2>Valor da Compra</h2>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.name} - Quantidade: {item.quantity} - R${(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Total: {isNaN(total) || total === undefined ? 'R$0.00' : `R$${total.toFixed(2)}`}</p>
        <button onClick={finalizePurchase}>Confirmar Compra</button>
        <button onClick={closeModal}>Cancelar</button>
        {/* <button onClick={addMoreProducts}>Adicionar Mais Produtos</button> */}
      </Modal>
    </div>
  );
};

export default OrderSummary;
