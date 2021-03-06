import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardProduct from '../componentes/CardProduct';
import '../styles/produtoLista.css';

class ProdutoLista extends Component {
  render() {
    const { resultSearch, funcAddItem } = this.props;
    return (
      <section className="produto-lista">
        {resultSearch.map((value) => (
          <CardProduct
            key={ value.id }
            produto={ value }
            funcAddItem={ funcAddItem }
          />
        ))}
      </section>
    );
  }
}

ProdutoLista.propTypes = {
  resultSearch: PropTypes.instanceOf(Array).isRequired,
  funcAddItem: PropTypes.func.isRequired,
};

export default ProdutoLista;
