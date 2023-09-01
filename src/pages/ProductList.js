// ProductList.js
import React, { Component } from 'react';

class ProductList extends Component {
  addToCart = product => {
    this.props.addToCart(product);
  };

  render() {
    const { products } = this.props;
    console.log('Lista de produtos:', products);

    return (
      <div>
        <h2>Produtos Disponíveis</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - R${product.price}{' '}
              <button onClick={() => this.addToCart(product)}>
                Adicionar ao Carrinho
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductList;
