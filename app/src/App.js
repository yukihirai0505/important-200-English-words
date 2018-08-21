import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {getWords} from './utils/api';

class App extends Component {

  constructor() {
    super()
    this.state = {
      currentNum: 0,
      words: []
    }
  }

  getWords() {
    getWords().then(words => {
      this.setState({words})
    });
  }

  componentWillMount() {
    this.getWords()
  }


  render() {
    const {currentNum, words} = this.state
    let currentWord = words[currentNum]
    console.log(currentWord);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Important 200 English words</h1>
        </header>
        <p className="App-intro">
          {currentWord &&
          <p>{currentWord.level} {currentWord.word} {currentWord.japanese} {currentWord.example}</p>
          }
        </p>
      </div>
    );
  }
}

export default App;
