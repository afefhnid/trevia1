import React, { Component } from 'react';
import {BrowserRouter as Router, Route }from 'react-router-dom';

import './App.css';
import HomeContainer from "../../views/home/homeContainer";
import CategoryContainer from "../../views/category/categoryContainer";
import GamesOver from "../../views/gamesover/gamesover";
import Footer from '../footer/Footer';
class App extends Component {
  render() {
    return (
      <div className= 'App'>
          <Router>
            <div>
              <Route exact path ="/" component={HomeContainer} />
                <Route path="/categories/:id" component={CategoryContainer} />
                <Route path="/GamesOver" component={GamesOver} />
            </div>
          </Router>
          <Footer/>
      </div>
    );
  }
}

export default App;
