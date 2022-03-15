import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FinalizarCompras extends Component {
  render() {
    const { itensCarrinho } = this.props;
    return (
      <section>
        <label htmlFor="fullNameInput">
          Nome completo
          <input
            data-testid="checkout-fullname"
            type="text"
            id="fullNameInput"
            name="fullNameInput"
          />
        </label>
        <label htmlFor="emailInput">
          Email
          <input
            data-testid="checkout-email"
            type="text"
            id="emailInput"
            name="emailInput"
          />
        </label>
        <label htmlFor="cpfInput">
          CPF
          <input
            data-testid="checkout-cpf"
            type="text"
            id="cpfInput"
            name="cpfInput"
          />
        </label>
        <label htmlFor="phoneInput">
          Telefone
          <input
            data-testid="checkout-phone"
            type="text"
            id="phoneInput"
            name="phoneInput"
          />
        </label>
        <label htmlFor="cepInput">
          CEP
          <input
            data-testid="checkout-cep"
            type="text"
            id="cepInput"
            name="cepInput"
          />
        </label>
        <label htmlFor="addressInput">
          Endereço
          <input
            data-testid="checkout-address"
            type="text"
            id="addressInput"
            name="addressInput"
          />
        </label>
      </section>
    );
  }
}

FinalizarCompras.propTypes = {
  itensCarrinho: PropTypes.instanceOf(Object).isRequired,
};

export default FinalizarCompras;
