import React, { useState } from 'react';
import Modal from 'react-modal';
import style from './OrderSummary.module.css'

const OrderSummary = ({ cart, total, clearCart, addToCart, addToPurchaseHistory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  Modal.setAppElement('#root');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const finalizePurchase = () => {
    // Registre o pedido no histórico de compras antes de limpar o carrinho
    addToPurchaseHistory(cart, total);
    clearCart();
    closeModal();
  };

  return (
    <div className={style.main__03}>
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
