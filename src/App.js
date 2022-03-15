// Requisito realizados por todos do grupo:
// João Vitor Santos Costa, Maria Clara Medeiros Paulino,
// Rafael de Alvarenga Reis, Angelica Diniz, Alexsandro Pinheiro Ferreira.

import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import Search from './pages/Search';
import Cart from './pages/Cart';
import ButtonRadios from './componentes/ButtonRadios';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import ProdutoLista from './pages/ProdutoLista';
import ProductDetail from './componentes/ProductDetail';
import FinalizarCompras from './pages/FinalizarCompras';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
      resultSearch: [],
      categorieToSearch: '',
      itensCarrinho: {},
    };
  }

  componentDidMount() {
    this.categories();
  }

  funcAddItem = (produto) => {
    const { id } = produto;
    const { itensCarrinho } = this.state;
    if (itensCarrinho[id]) {
      itensCarrinho[id].push(produto);
      this.setState({
        itensCarrinho,
      });
    } else {
      this.setState((prevState) => ({
        itensCarrinho: { ...prevState.itensCarrinho, [id]: [produto] },
      }));
    }
  };

  funcRemoveItem = (produto) => {
    const { id } = produto;
    const { itensCarrinho } = this.state;
    if (itensCarrinho[id].length > 1) {
      itensCarrinho[id].shift(produto);
      // this.setState({
      //   itensCarrinho,
      // });
    } else {
      delete itensCarrinho[id];
    }
    this.setState({
      itensCarrinho,
    });
  };

  categories = async () => {
    this.setState({
      categorias: await getCategories(),
    });
  };

  searchQuery = async (categoreID, query) => {
    const { categorieToSearch } = this.state;
    let obj;
    if (categorieToSearch && !categoreID) {
      obj = await getProductsFromCategoryAndQuery(categorieToSearch, query);
    } else {
      obj = await getProductsFromCategoryAndQuery(categoreID, query);
    }
    this.setState({
      resultSearch: obj.results,
      categorieToSearch: categoreID,
    });
  };

  render() {
    const { categorias, resultSearch, itensCarrinho } = this.state;
    // console.log(itensCarrinho);
    return (
      <div className="App">
        <BrowserRouter>
          <aside>
            {categorias.map((categoria) => (
              <ButtonRadios
                key={ categoria.id }
                id={ categoria.id }
                name={ categoria.name }
                funSearchQuery={ this.searchQuery }
              />
            ))}
          </aside>
          <section>
            <h1>Grupo 24</h1>
            <button id="button-cart" type="button">
              <Link to="/carrinho" data-testid="shopping-cart-button">
                carrinho de compras
              </Link>
            </button>
            {resultSearch.length > 0 && <Redirect to="lista-produtos" />}
            <Switch>
              <Route
                exact
                path="/"
                render={ () => <Search funSearchQuery={ this.searchQuery } /> }
              />
              <Route
                path="/finalizar-compra"
                render={ (props) => (
                  <FinalizarCompras { ...props } itensCarrinho={ itensCarrinho } />
                ) }
              />
              <Route
                path="/carrinho"
                render={ () => (
                  <Cart
                    itensCarrinho={ itensCarrinho }
                    funcAddItem={ this.funcAddItem }
                    funcRemoveItem={ this.funcRemoveItem }
                  />
                ) }
              />
              <Route
                path="/lista-produtos"
                render={ (props) => (
                  <ProdutoLista
                    { ...props }
                    resultSearch={ resultSearch }
                    funcAddItem={ this.funcAddItem }
                  />
                ) }
              />
              <Route
                path="/product-detail/:id"
                render={ (props) => (
                  <ProductDetail
                    { ...props }
                    products={ resultSearch }
                    funcAddItem={ this.funcAddItem }
                  />
                ) }
              />
            </Switch>
          </section>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
