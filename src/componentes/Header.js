import React, { Component } from 'react';
import Proptypes from 'prop-types';
import '../styles/header.css';
import { Link } from 'react-router-dom';
import { IoMdCart } from 'react-icons/io';

class Header extends Component {
  render() {
    const { quantItemsToCart } = this.props;
    return (
      <header>
        <h1>
          <Link to="/">
            Online Store
          </Link>
        </h1>
        <Link id="button-cart" to="/carrinho" data-testid="shopping-cart-button">
          <IoMdCart />
          <span data-testid="shopping-cart-size">
            {
              quantItemsToCart
            }
          </span>
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  quantItemsToCart: Proptypes.number.isRequired,
};

export default Header;
