// Requisito realizados por todos do grupo:
// João Vitor Santos Costa, Maria Clara Medeiros Paulino,
// Rafael de Alvarenga Reis, Angelica Diniz, Alexsandro Pinheiro Ferreira.

import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Search from './pages/Search';
import Cart from './pages/Cart';
import ButtonRadios from './componentes/ButtonRadios';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import ProdutoLista from './pages/ProdutoLista';
import ProductDetail from './componentes/ProductDetail';
import FinalizarCompras from './pages/FinalizarCompras';
import Header from './componentes/Header';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
      resultSearch: [],
      categorieToSearch: '',
      itensCarrinho: {},
      quantItemsToCart: 0,
    };
  }

  componentDidMount() {
    const carrinhoJSON = localStorage.getItem('carrinho');
    if (carrinhoJSON) {
      const itensCarrinho = JSON.parse(carrinhoJSON);
      this.setState({
        itensCarrinho,
      });
    }
    this.categories();
    this.countItemsToCart();
  }

  funcAddItem = (produto) => {
    const { id } = produto;
    const carrinhoJSON = localStorage.getItem('carrinho');
    if (carrinhoJSON) {
      const itensCarrinho = JSON.parse(carrinhoJSON);
      if (itensCarrinho[id]) {
        itensCarrinho[id].push(produto);
        localStorage.setItem('carrinho', JSON.stringify(itensCarrinho));
        this.setState({
          itensCarrinho,
        });
      } else {
        localStorage
          .setItem('carrinho', JSON.stringify({ ...itensCarrinho, [id]: [produto] }));
        this.setState((prevState) => ({
          itensCarrinho: { ...prevState.itensCarrinho, [id]: [produto] },
        }));
      }
    } else {
      localStorage.setItem('carrinho', JSON.stringify({ [id]: [produto] }));
      this.setState({
        itensCarrinho: { [id]: [produto] },
      });
    }
    this.countItemsToCart();
  };

  funcRemoveItem = (produto) => {
    const { id } = produto;
    const carrinhoJSON = localStorage.getItem('carrinho');
    const itensCarrinho = JSON.parse(carrinhoJSON);
    if (itensCarrinho[id].length > 1) {
      itensCarrinho[id].shift(produto);
    } else {
      delete itensCarrinho[id];
    }
    localStorage.setItem('carrinho', JSON.stringify(itensCarrinho));
    this.setState({
      itensCarrinho,
    });
    this.countItemsToCart();
  };

  countItemsToCart = () => {
    let count = 0;
    const itensCarrinhoJSON = localStorage.getItem('carrinho');
    if (itensCarrinhoJSON) {
      const itensCarrinho = JSON.parse(itensCarrinhoJSON);
      const itensCarrinhoArray = Object.values(itensCarrinho);
      itensCarrinhoArray.forEach((produto) => {
        count += produto.length;
      });
      this.setState({
        quantItemsToCart: count,
      });
    }
  }

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
    const { categorias, resultSearch, itensCarrinho, quantItemsToCart } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Header quantItemsToCart={ quantItemsToCart } />
          <main>
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
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
