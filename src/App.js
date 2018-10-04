import React, { Component } from 'react';
import QuoteGenerator from './components/QuoteGenerator'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <QuoteGenerator/>
      </div>
    );
  }
}

export default App;
