import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardProduct extends Component {
  render() {
    const { produto, funcAddItem } = this.props;
    return (
      <div data-testid="product">
        <p>
          <Link
            data-testid="product-detail-link"
            to={ `/product-detail/${produto.id} ` }
          >
            {produto.title}
          </Link>
        </p>
        <img src={ produto.thumbnail } alt={ produto.title } />
        <p>{produto.price}</p>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => {
            funcAddItem(produto);
          } }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

CardProduct.propTypes = {
  produto: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
  funcAddItem: PropTypes.func.isRequired,
};

export default CardProduct;
