import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      sumValue: 0,
    };
  }

  componentDidMount() {
    this.sumValueTotal();
  }

  sumValueTotal = () => {
    const { itensCarrinho } = this.props;
    const arrayItens = Object.values(itensCarrinho);
    let valor = 0;
    arrayItens.forEach((produto) => {
      valor = Number(produto.length) * Number(produto[0].price);
    });
    this.setState({
      sumValue: valor,
    });
  };

  // limitAddProductToCart = (quantToCart, availableQuanty) => {

  // }

  render() {
    const { itensCarrinho, funcAddItem, funcRemoveItem } = this.props;
    const { sumValue } = this.state;
    const arrayItens = Object.values(itensCarrinho);
    return (
      <div className="page-cart">
        <h2>Carrinho de Compras</h2>
        {
          arrayItens.length > 0 ? (
            arrayItens.map((index) => (
              <div key={ index[0].id }>
                <p data-testid="shopping-cart-product-name">{index[0].title}</p>
                <img src={ index[0].thumbnail } alt={ index[0].title } />
                <p>
                  R$:
                  {' '}
                  {index[0].price}
                </p>
                <div>
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ () => {
                      funcRemoveItem(index[0]);
                      this.sumValueTotal();
                    } }
                  >
                    -
                  </button>
                  <p data-testid="shopping-cart-product-quantity">
                    Quantidade:
                    {' '}
                    {index.length}
                  </p>
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    disabled={ index.length >= index[0].available_quantity }
                    onClick={ () => {
                      funcAddItem(index[0]);
                      this.sumValueTotal();
                    } }
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h2 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h2>
          )
        }

        <p>
          Total:
          {' '}
          {sumValue}
        </p>

        <br />

        <button type="button">
          <Link to="/finalizar-compra" data-testid="checkout-products ">
            Finalizar Compras
          </Link>
        </button>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

Cart.propTypes = {
  itensCarrinho: PropTypes.instanceOf(Object).isRequired,
  funcAddItem: PropTypes.func.isRequired,
  funcRemoveItem: PropTypes.func.isRequired,
};

export default Cart;
