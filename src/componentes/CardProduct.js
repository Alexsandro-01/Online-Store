import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardProduct extends Component {
  render() {
    const { produto } = this.props;
    return (
      <div data-testid="product">
        <p>
          <Link
            data-testid="product-detail-link"
            to={ `/product-detail/${produto.id} ` }
          >
            { produto.title }
          </Link>
        </p>
        <img src={ produto.thumbnail } alt={ produto.title } />
        <p>{ produto.price }</p>
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
};

export default CardProduct;
