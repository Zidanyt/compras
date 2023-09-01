// AddProductForm.js
import React, { Component } from 'react';

import style from './AddProductForm.module.css'

class AddProductForm extends Component {
  state = {
    name: '',
    price: '',
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleAddProduct = () => {
    const { name, price } = this.state;
    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
    };
  
    this.props.addProduct(newProduct);
    this.setState({ name: '', price: '' });
  
    // Chame a função updateLocalStorage da prop
    this.props.updateLocalStorage();
  };
  
  render() {
    return (
      <div className={style.container}>
        <h2 className={style.container__titulo}>Adicionar Produto</h2>
        <form className={style.container__from}>
          <label className={style.from__label}>
            <h4>Nome do Produto:</h4>
            <input
              className={style.from__input}
              type="text"
              name="name"
              value={this.state.name}
              placeholder='Nome do Produto'
              onChange={this.handleInputChange}
            />
          </label>
          <label className={style.from__label}>
            <h4>Preço:</h4>
            <input
              className={style.from__input}
              type="text"
              name="price"
              value={this.state.price}
              placeholder='Preço'
              onChange={this.handleInputChange}
            />
          </label>
          <button type="button" onClick={this.handleAddProduct}>
            Adicionar Produto
          </button>
        </form>
      </div>
    );
  }
}

export default AddProductForm;
