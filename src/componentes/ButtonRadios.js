// Requisito realizados por todos do grupo:
// João Vitor Santos Costa, Maria Clara Medeiros Paulino,
// Rafael de Alvarenga Reis, Angelica Diniz, Alexsandro Pinheiro Ferreira.

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonRadios extends Component {
  render() {
    const { id, name } = this.props;
    return (
      <div>
        <form>
          <label htmlFor={ id }>
            <input type="radio" data-testid="category" name={ name } id={ id } />
            {name}
          </label>
        </form>
      </div>
    );
  }
}

ButtonRadios.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ButtonRadios;
