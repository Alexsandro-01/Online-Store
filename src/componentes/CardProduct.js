import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardProduct extends Component {
  render() {
    const { produto } = this.props;
    return (
      <div data-testid="product">
        <p>{ produto.title }</p>
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
  }).isRequired,
};

export default CardProduct;
