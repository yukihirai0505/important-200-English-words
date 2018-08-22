import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {getWords} from './utils/api';

class App extends Component {

  constructor() {
    super()
    this.state = {
      currentNum: 0,
      currentQuestion: {
        level: '',
        word: '',
        example: ''
      },
      words: []
    }
  }

  setWords() {
    const {currentNum} = this.state
    getWords().then(words => {
      let currentQuestion = words[currentNum]
      console.log(currentQuestion);
      this.setState({words, currentQuestion});
    });
  }

  componentWillMount() {
    this.setWords()
  }

  answer(input) {
    const {currentNum, currentQuestion, words} = this.state
    console.log(input);
    if (currentQuestion) {
      if (input === currentQuestion.word) {
        let nextNum = currentNum + 1
        this.setState({
          currentNum: nextNum,
          currentQuestion: words[nextNum]
        })
      }
    }
  }

  displayQuestion() {
    const {currentNum, currentQuestion} = this.state
    if (currentQuestion) {
      let level = currentQuestion.level,
        word = currentQuestion.word,
        example = currentQuestion.example.replace(word.slice(2), '<span class="App-attention">______</span>')

      return (
        <div>
          <p>レベル: {level}</p>
          <p>{currentNum + 1}問目 <span dangerouslySetInnerHTML={{__html: example}}/></p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Important 200 English words</h1>
        </header>
        <div className="App-intro">
          {this.displayQuestion()}
          <input className="App-input" type="text" onChange={e => this.answer(e.target.value)}/>
        </div>
      </div>
    );
  }
}

export default App;
