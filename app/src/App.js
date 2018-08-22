import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'
import {getQuestions} from './utils/api'

class App extends Component {

  constructor() {
    super()
    this.state = {
      currentNum: 0,
      currentQuestion: {
        level: '',
        word: '',
        example: '',
        translation: ''
      },
      questions: []
    }
  }

  setQuestions() {
    const {currentNum} = this.state
    getQuestions().then(questions => {
      let currentQuestion = questions[currentNum]
      console.log(currentQuestion);
      this.setState({questions, currentQuestion});
    });
  }

  componentWillMount() {
    this.setQuestions()
  }

  answer(e) {
    const {currentNum, currentQuestion, questions} = this.state
    let input = e.target.value;
    console.log(input);
    if (currentQuestion) {
      if (input === currentQuestion.word) {
        let nextNum = currentNum + 1
        this.setState({
          currentNum: nextNum,
          currentQuestion: questions[nextNum]
        })
        e.target.value = ''
      }
    }
  }

  displayQuestion() {
    const {currentNum, currentQuestion} = this.state
    if (currentQuestion) {
      let level = currentQuestion.level,
        word = currentQuestion.word,
        example = currentQuestion.example.replace(word.slice(2), '<span class="App-attention">______</span>'),
        translation = currentQuestion.translation

      return (
        <div>
          <p>レベル: {level}</p>
          <p>{currentNum + 1}問目 <span dangerouslySetInnerHTML={{__html: example}}/></p>
          <p>{translation}</p>
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
          <input className="App-input" type="text" onChange={e => this.answer(e)}/>
        </div>
      </div>
    );
  }
}

export default App;
