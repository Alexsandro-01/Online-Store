// Requisito realizados por todos do grupo:
// João Vitor Santos Costa, Maria Clara Medeiros Paulino,
// Rafael de Alvarenga Reis, Angelica Diniz, Alexsandro Pinheiro Ferreira.

import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Search from './pages/Search';
import Cart from './pages/Cart';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Search } />
            <Route path="/carrinho" component={ Cart } />
          </Switch>
          <button type="button">
            <Link to="/carrinho" data-testid="shopping-cart-button">
              carrinho de compras
            </Link>
          </button>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
