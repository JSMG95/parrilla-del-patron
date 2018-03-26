import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Tables from './Tables';
import AdminPanel from './AdminPanel';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path="/" component={Tables} />
          <Route path="/admin" component={AdminPanel} />

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
