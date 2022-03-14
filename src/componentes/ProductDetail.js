import React from 'react';
import PropTypes from 'prop-types';

class ProductDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    this.findProducts();
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

  render() {
    const { product } = this.state;
    const { funcAddItem } = this.props;
    return (
      <div>
        <h2>Especificações Técnicas</h2>
        <img src={ product.thumbnail } alt={ product.title } />
        <ul>
          <li data-testid="product-detail-name">
            Nome:
            {product.title}
          </li>
          <li>
            Valor:
            {product.price}
          </li>

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