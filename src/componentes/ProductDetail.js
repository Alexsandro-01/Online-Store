import React from 'react';
import PropTypes from 'prop-types';
import '../styles/productDetail.css';

class ProductDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      enviar: 'Enviar',
    };
  }

  componentDidMount() {
    // this.findProducts();
    this.searchApi();
  }

  findProducts = () => {
    const {
      products,
      match: {
        params: { id },
      },
    } = this.props;
    const reform = id.trim();
    const produto = products.find((value) => value.id === reform);
    this.setState({
      product: produto,
    });
  };

  searchApi = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const data = await fetch(`https://api.mercadolibre.com/items/${id.trim()}`);
    const response = await data.json();

    this.setState({
      product: response,
    });
  };

  addAvaliacao = (aval, id) => {
    const avaliacoesJson = localStorage.getItem('avaliacao');
    const avaliacoesObj = JSON.parse(avaliacoesJson);

    if (avaliacoesObj && avaliacoesObj[id]) {
      avaliacoesObj[id].push(aval);
      localStorage.setItem('avaliacao', JSON.stringify(avaliacoesObj));
    } else {
      const avaliacoes = { ...avaliacoesObj, [id]: [aval] };
      localStorage.setItem('avaliacao', JSON.stringify(avaliacoes));
    }
  };

  avaliacao = () => {
    const { product } = this.state;
    const email = document.getElementById('emailInput');
    const comentario = document.getElementById('comentario');
    const notas = document.querySelectorAll('input[name=nota]');
    let notaUsuario = false;
    notas.forEach((nota) => {
      if (nota.checked) {
        notaUsuario = nota;
      }
    });
    if (email.value === '') {
      email.style.border = 'solid 2px red';
    } else if (!notaUsuario.id) {
      const radioParents = document.getElementById('radio-container');
      radioParents.style.border = 'solid 2px red';
    } else {
      const aval = {
        email: email.value,
        nota: notaUsuario.id,
        avaliacaoText: comentario.value,
      };
      this.addAvaliacao(aval, product.id);
    }
    this.setState({
      enviar: 'Enviar',
    });
  };

  recuperarAvaliacao = () => {
    const avaliacoesJson = localStorage.getItem('avaliacao');
    if (avaliacoesJson) {
      const avaliacoes = JSON.parse(avaliacoesJson);
      return avaliacoes;
    }
    return {};
  };

  render() {
    const { product, enviar } = this.state;
    const { funcAddItem } = this.props;
    const avaliacoes = this.recuperarAvaliacao();
    return (
      <div className="product-detail">
        <p data-testid="product-detail-name">
          {product.title}
        </p>
        <p>
          R$
          {' '}
          {product.price}
        </p>
        <div className="img-container">
          <img src={ product.thumbnail } alt={ product.title } />
        </div>
        <h4>Especificações Técnicas</h4>
        <ul>
          {
            product.shipping && product.shipping.free_shipping
              && (
                <li data-testid="free-shipping">
                  Frete Grátis
                </li>
              )
          }
          <li>
            Atributos:
            {product.attributes
              && product.attributes.map((atribute) => (
                <p key={ atribute.id }>
                  {atribute.name}
                  :
                  {' '}
                  {atribute.value_name}
                </p>
              ))}
          </li>
        </ul>
        <div>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => {
              funcAddItem(product);
            } }
          >
            Adicionar ao Carrinho
          </button>
        </div>

        <br />

        <form>
          <label htmlFor="emailInput">
            {' '}
            Digite seu email:
            <input
              type="email"
              name="emailInput"
              id="emailInput"
              data-testid="product-detail-email"
            />
          </label>

          <br />

          <div id="radio-container">
            <p>Adicione uma nota</p>
            <label htmlFor="1">
              <input type="radio" name="nota" id="1" data-testid="1-rating" />
              1
            </label>
            <label htmlFor="2">
              <input type="radio" name="nota" id="2" data-testid="2-rating" />
              2
            </label>
            <label htmlFor="3">
              <input type="radio" name="nota" id="3" data-testid="3-rating" />
              3
            </label>
            <label htmlFor="4">
              <input type="radio" name="nota" id="4" data-testid="4-rating" />
              4
            </label>
            <label htmlFor="5">
              <input type="radio" name="nota" id="5" data-testid="5-rating" />
              5
            </label>
          </div>

          <br />

          <label htmlFor="comentario">
            <textarea
              id="comentario"
              rows="10"
              cols="30"
              placeholder="Descrava a avaliação"
              data-testid="product-detail-evaluation"
            />
          </label>
          <div>
            <button
              onClick={ () => {
                this.avaliacao();
              } }
              type="button"
              data-testid="submit-review-btn"
            >
              {enviar}
            </button>
          </div>
        </form>
        <div>
          {avaliacoes[product.id] ? (
            avaliacoes[product.id].map((avali) => (
              <div key={ avali.email }>
                <p>
                  <span>{avali.email}</span>
                  <span>{avali.nota}</span>
                </p>
                <p>{avali.avaliacaoText}</p>
              </div>
            ))
          ) : (
            <h3>Não há Avaliações</h3>
          )}
        </div>
      </div>
    );
  }
}
ProductDetail.propTypes = {
  products: PropTypes.instanceOf(Array).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  funcAddItem: PropTypes.func.isRequired,
};
export default ProductDetail;
