// Requisito realizados por todos do grupo:
// João Vitor Santos Costa, Maria Clara Medeiros Paulino,
// Rafael de Alvarenga Reis, Angelica Diniz, Alexsandro Pinheiro Ferreira.

import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Search from './pages/Search';
import Cart from './pages/Cart';
import ButtonRadios from './componentes/ButtonRadios';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import CardProduct from './componentes/CardProduct';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
      resultSearch: [],
    };
  }

  componentDidMount() {
    this.categories();
  }

  categories = async () => {
    this.setState({
      categorias: await getCategories(),
    });
  };

  searchQuery = async (query) => {
    const obj = await getProductsFromCategoryAndQuery(false, query);
    this.setState({
      resultSearch: obj.results,
    });
  }

  render() {
    const { categorias, resultSearch } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <aside>
            {categorias.map((categoria) => (
              <ButtonRadios
                key={ categoria.id }
                id={ categoria.id }
                name={ categoria.name }
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
            <Switch>
              <Route
                exact
                path="/"
                render={
                  () => <Search funSearchQuery={ this.searchQuery } />
                }
              />
              <Route path="/carrinho" component={ Cart } />
            </Switch>
            <section>
              {
                resultSearch
                  .map((value) => <CardProduct key={ value.id } produto={ value } />)
              }
            </section>
          </section>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
