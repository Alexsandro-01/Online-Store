import React, { Component } from 'react';
import '../styles/finalizarCompra.css';
// import PropTypes from 'prop-types';

class FinalizarCompras extends Component {
  render() {
    // const { itensCarrinho } = this.props;
    return (
      <section className="finalizar-compra">
        <h2>Finalizar Compra</h2>
        <label htmlFor="fullNameInput">
          Nome completo
        </label>
        <div>
            <input
              data-testid="checkout-fullname"
              type="text"
              id="fullNameInput"
              name="fullNameInput"
            />
        </div>
        <label htmlFor="emailInput">
          Email
        </label>
        <div>
            <input
              data-testid="checkout-email"
              type="text"
              id="emailInput"
              name="emailInput"
              />
        </div>
        <label htmlFor="cpfInput">
          CPF
        </label>
        <div>
            <input
              data-testid="checkout-cpf"
              type="text"
              id="cpfInput"
              name="cpfInput"
              />
        </div>
        <label htmlFor="phoneInput">
          Telefone
        </label>
        <div>
            <input
              data-testid="checkout-phone"
              type="text"
              id="phoneInput"
              name="phoneInput"
            />
        </div>
        <label htmlFor="cepInput">
          CEP
        </label>
        <div>
            <input
              data-testid="checkout-cep"
              type="text"
              id="cepInput"
              name="cepInput"
            />
        </div>
        <label htmlFor="addressInput">
          Endereço
        </label>
        <div>
          <input
            data-testid="checkout-address"
            type="text"
            id="addressInput"
            name="addressInput"
          />
        </div>

        <div>
          <button>
            Finalizar
          </button>
        </div>
      </section>
    );
  }
}

// FinalizarCompras.propTypes = {
//   itensCarrinho: PropTypes.instanceOf(Object).isRequired,
// };

export default FinalizarCompras;
