// Requisito realizados por todos do grupo:
// João Vitor Santos Costa, Maria Clara Medeiros Paulino,
// Rafael de Alvarenga Reis, Angelica Diniz, Alexsandro Pinheiro Ferreira.

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/buttonRadios.css';

class ButtonRadios extends Component {
  render() {
    const { id, name, funSearchQuery } = this.props;
    return (
      <div className="category">
        <label htmlFor={ id }>
          <input
            type="radio"
            data-testid="category"
            name="categorias"
            id={ id }
            onChange={ () => funSearchQuery(id, false) }
          />
          {name}
        </label>
        {/* <hr /> */}
      </div>
    );
  }
}

ButtonRadios.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  funSearchQuery: PropTypes.func.isRequired,
};

export default ButtonRadios;
