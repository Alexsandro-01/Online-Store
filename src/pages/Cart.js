import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cart extends Component {
  render() {
    const { itensCarrinho } = this.props;
    const arrayItens = Object.values(itensCarrinho);
    // let arrayItens;
    // if (itensCarrinho) {
    // }
    console.log(arrayItens);
    return (
      <div className="page-cart">
        <h2>Carrinho de Compras</h2>
        {arrayItens.map((index) => (
          <div key={ index[0].id }>
            <p data-testid="shopping-cart-product-name">{index[0].title}</p>
            <img src={ index[0].thumbnail } alt={ index[0].title } />
            <p data-testid="shopping-cart-product-quantity">
              Quantidade:
              {' '}
              {index.length}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

Cart.propTypes = {
  itensCarrinho: PropTypes.instanceOf(Object).isRequired,
};

export default Cart;
