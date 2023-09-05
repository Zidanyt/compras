import React, { Component } from 'react';

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    };
  }

  handleSearchChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  render() {
    const { products, addToCart } = this.props; // Receba a função addToCart das props

    const { searchTerm } = this.state;

    // Filtrar produtos com base no termo de pesquisa
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
        <h2>Produtos Disponíveis</h2>
        <input
          type="text"
          placeholder="Pesquisar produtos"
          value={searchTerm}
          onChange={this.handleSearchChange}
        />
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              {product.name} - R${product.price}{' '}
              <button onClick={() => addToCart(product)}>
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
