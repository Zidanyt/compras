import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import OrderSummary from './pages/OrderSummary';
import AddProductForm from './pages/AddProductForm';
import PurchaseHistory from './PurchaseHistory';
import Modal from 'react-modal';

import './App.css';

Modal.setAppElement('#root');

class App extends Component {
  constructor(props) {
    super(props);
  
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedPurchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
  
    this.state = {
      products: storedProducts,
      cart: storedCart,
      purchaseHistory: storedPurchaseHistory,
      isLoading: false,
    };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.updateLocalStorage);
  }
  
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.updateLocalStorage);
  }
  
  updateLocalStorage = () => {
    localStorage.setItem('products', JSON.stringify(this.state.products));
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
    localStorage.setItem('purchaseHistory', JSON.stringify(this.state.purchaseHistory));
  };
  
  

  // Define a função addToPurchaseHistory dentro da classe
  addToPurchaseHistory = (cart, total) => {
    const newPurchase = {
      cart,
      total,
    };
  
    // Adicione o novo histórico à matriz existente
    const updatedHistory = [...this.state.purchaseHistory, newPurchase];
  
    // Atualize o estado e salve no localStorage
    this.setState(
      { purchaseHistory: updatedHistory },
      () => localStorage.setItem('purchaseHistory', JSON.stringify(updatedHistory))
    );
  };
  

  // Dentro da função completeOrder ou onde você finaliza um pedido

// App.js

completeOrder = () => {
  // Lógica para completar o pedido

  // Crie um objeto de pedido concluído com base no carrinho e no total
  const completedOrder = {
    cart: this.state.cart,
    total: this.calculateTotal(), // Substitua por sua lógica de cálculo de total
    date: new Date().toLocaleString(), // Adicione uma data para o pedido, se necessário
  };

  // Adicione o pedido ao histórico de compras
  const updatedHistory = [...this.state.purchaseHistory, completedOrder];

  // Atualize o estado com o novo histórico
  this.setState({ purchaseHistory: updatedHistory }, () => {
    // Após a atualização do estado, chame a função para atualizar o localStorage
    this.updateLocalStorage();
  });

  // Limpe o carrinho ou faça qualquer outra lógica necessária
  this.clearCart();
};

  // Atualize o localStorage sempre que houver alterações no carrinho
  updateLocalStorage = () => {
    localStorage.setItem('products', JSON.stringify(this.state.products));
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  };
  
  addToCart = (product) => {
    const existingCartItem = this.state.cart.find((item) => item.id === product.id);
  
    let updatedCart;
  
    if (existingCartItem) {
      updatedCart = this.state.cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      const newCartItem = {
        ...product,
        price: parseFloat(product.price), // Converter preço para número
        quantity: 1,
      };
      updatedCart = [...this.state.cart, newCartItem];
    }
  
    this.setState({ cart: updatedCart }, () => {
      this.updateLocalStorage();
    });
  };
  

  clearCart = () => {
    this.setState({ cart: [] }, () => {
      // Chame a função para atualizar o localStorage após a limpeza do carrinho
      this.updateLocalStorage();
    });
  }
  

  removeFromCart = itemToRemove => {
    const updatedCart = this.state.cart.filter(item => item.id !== itemToRemove.id);
    this.setState({ cart: updatedCart });
  };

  updateQuantity = (itemToUpdate, change) => {
    const updatedCart = this.state.cart.map(item =>
      item.id === itemToUpdate.id ? { ...item, quantity: item.quantity + change } : item
    );
    this.setState({ cart: updatedCart });
  };
  
  addProduct = product => {
    const newProduct = {
      ...product,
      id: this.state.products.length + 1,
    };
  
    const updatedProducts = [...this.state.products, newProduct];
    this.setState({ products: updatedProducts }, () => {
      // Atualizar o localStorage após atualizar o estado
      localStorage.setItem('products', JSON.stringify(this.state.products));
      console.log('Produto adicionado:', newProduct);
    });
  };

  render() {
    const total = this.state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
      <Router>
        <div className='corpo'>
          <div>
            <Navigation />
          </div>
          <Routes>
            <Route
              path='/products'
              element={<ProductList products={this.state.products} addToCart={this.addToCart} />}
            />
            <Route
              path='/cart'
              element={<ShoppingCart cart={this.state.cart} removeFromCart={this.removeFromCart} updateQuantity={this.updateQuantity} />}
            />
            <Route
              path='/summary'
              element={
                <OrderSummary
                  cart={this.state.cart}
                  clearCart={this.clearCart}
                  total={total}
                  addToPurchaseHistory={this.addToPurchaseHistory}
                />
              }
            />
            <Route
              path='/add'
              element={<AddProductForm addProduct={this.addProduct} updateLocalStorage={this.updateLocalStorage} />}
            />
            <Route
              path='/history'
              element={<PurchaseHistory purchaseHistory={this.state.purchaseHistory} />}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
