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
          {displayQuestion(currentWord, currentNum + 1)}
        </p>
      </div>
    );
  }
}

function displayQuestion(currentWord, questionNum) {
  if (currentWord) {
    let level = currentWord.level,
      word = currentWord.word,
      japanese = currentWord.japanese,
      example = currentWord.example.replace(word.slice(1), '______')


    return (<p>{questionNum}問目 {example}</p>);
  }
}

export default App;
