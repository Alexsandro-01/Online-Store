import React, { Component } from 'react';

class Cart extends Component {
  render() {
    return (
      <div className="page-cart">
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      </div>
    );
  }
}

export default Cart;
