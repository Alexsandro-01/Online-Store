// Requisito realizados por todos do grupo:
// João Vitor Santos Costa, Maria Clara Medeiros Paulino,
// Rafael de Alvarenga Reis, Angelica Diniz, Alexsandro Pinheiro Ferreira.

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
    };
  }

  handleQuery = ({ target }) => {
    this.setState({
      query: target.value,
    });
  }

  render() {
    const { query } = this.state;
    const { funSearchQuery } = this.props;
    return (
      <div className="searchClass">
        <input
          className="textInput"
          type="text"
          name="name"
          value={ query }
          onChange={ this.handleQuery }
          data-testid="query-input"
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ () => { funSearchQuery(query); } }
        >
          Buscar
        </button>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

Search.propTypes = {
  funSearchQuery: PropTypes.func.isRequired,
};

export default Search;
