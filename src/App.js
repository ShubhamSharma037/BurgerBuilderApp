import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/Burger Builder/BurgerBuilder'
import Checkout from './containers/CheckOut/CheckOut';
import Orders from './containers/Orders/Orders'
import { Route, Switch,BrowserRouter } from 'react-router-dom';




function App() {
  return (

    <div className="App">
      <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/checkout'  component={Checkout}/>
          <Route path='/orders' component={Orders}/>
          <Route path='/' exact component={BurgerBuilder}/>
          
        </Switch>
      </Layout>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
