import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'
import {getQuestions} from './utils/api'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

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
      correctFlg: false,
      showAnswerFlg: false,
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

  // TODO: 正解をみる
  checkAnswer() {

  }

  answer(e) {
    const {currentNum, currentQuestion, questions} = this.state
    e.persist(); // ref: https://stackoverflow.com/questions/432493/how-do-you-access-the-matched-groups-in-a-javascript-regular-expression
    let input = e.target.value;
    console.log(input);
    if (currentQuestion) {
      if (input === currentQuestion.word) {
        this.setState({correctFlg: true})
        setTimeout(() => {
          let nextNum = currentNum + 1
          this.setState({
            currentNum: nextNum,
            currentQuestion: questions[nextNum],
            correctFlg: false
          })
          e.target.value = ''
        }, 1000);
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
    const {correctFlg} = this.state
    let fontAwesome = correctFlg ?
      {
        icon: 'check-circle',
        className: 'App-success'
      } : {
        icon: 'check',
        className: 'App-attention'
      }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Important 200 English words</h1>
        </header>
        <div className="App-intro">
          {this.displayQuestion()}
          <FontAwesomeIcon icon={fontAwesome.icon} className={fontAwesome.className + ' App-input-icon'}/>
          <input className="App-input" type="text" onChange={e => this.answer(e)}/>
        </div>
      </div>
    );
  }
}

export default App;
