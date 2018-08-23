import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'
import {getQuestions, getImageUrls} from './utils/api'
import {shuffleArray} from './utils/shuffle'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class App extends Component {

  constructor() {
    super()
    this.state = {
      currentNum: 0,
      currentQuestion: {
        level: '',
        word: '',
        japanese: '',
        example: '',
        translation: ''
      },
      correctFlg: false,
      showAnswerFlg: false,
      finishFlg: false,
      questions: [],
      imageUrls: []
    }
  }

  componentWillMount() {
    const {currentNum} = this.state
    getQuestions().then(questions => {
      let _questions = shuffleArray(questions);
      let currentQuestion = _questions[currentNum]
      let keyword = currentQuestion.word
      if (keyword) {
        this.setState({
          currentQuestion,
          questions: _questions,
        });
        this.setImageUrls(keyword)
      }
    });
  }

  setImageUrls(keyword) {
    getImageUrls(keyword).then(imageUrls => {
      this.setState({imageUrls});
    })
  }

  checkAnswer() {
    this.setState({showAnswerFlg: true})
  }

  answer(e) {
    const {currentNum, currentQuestion, questions} = this.state
    e.persist(); // ref: https://stackoverflow.com/questions/432493/how-do-you-access-the-matched-groups-in-a-javascript-regular-expression
    let input = e.target.value;
    if (currentQuestion) {
      if (input === currentQuestion.word) {
        this.setState({correctFlg: true})
        let nextNum = currentNum + 1
        let nextQuestin = questions[nextNum];
        if (nextNum === questions.length) {
          this.setState({finishFlg: true});
        } else {
          setTimeout(() => {
            this.setState({
              currentNum: nextNum,
              currentQuestion: nextQuestin,
              correctFlg: false,
              showAnswerFlg: false,
              imageUrls: []
            })
            this.setImageUrls(nextQuestin.word)
            e.target.value = ''
          }, 500);
        }
      }
    }
  }

  displayQuestion() {
    const {currentNum, currentQuestion, showAnswerFlg, correctFlg} = this.state
    if (currentQuestion) {
      let level = currentQuestion.level,
        word = currentQuestion.word,
        japanese = currentQuestion.japanese,
        example = currentQuestion.example.replace(word.slice(2), '<span class="App-attention">______</span>'),
        translation = currentQuestion.translation,
        fontAwesome = correctFlg ?
          {
            icon: 'check-circle',
            className: 'App-success'
          } : {
            icon: 'check',
            className: 'App-attention'
          }
      return (
        <div>
          <p>レベル: {level}</p>
          <p>{currentNum + 1}問目 <span dangerouslySetInnerHTML={{__html: example}}/></p>
          <p>{translation}</p>
          <FontAwesomeIcon icon={fontAwesome.icon} className={fontAwesome.className + ' App-input-icon'}/>
          <input className="App-input" type="text" onChange={e => this.answer(e)}/>
          {!showAnswerFlg &&
          <div>
            <button className="App-show-btn" onClick={() => this.checkAnswer()}>答えを見る</button>
          </div>
          }
          {showAnswerFlg &&
          <p>答え: {word} ... {japanese}</p>
          }
        </div>
      );
    }
  }

  renderPhotos() {
    const {imageUrls} = this.state
    if (Array.isArray(imageUrls)) {
      return imageUrls.map((imageUrl) => {
        console.log(imageUrl)
        return (
          <img src={imageUrl} alt=""/>
        )
      })
    }
  }

  render() {
    const {finishFlg} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">The 200 most important words in English</h1>
        </header>
        <div className="App-intro">
          {finishFlg &&
          <p>お疲れ様でした</p>
          }
          {this.displayQuestion()}
          <div className="App-photo">
            {this.renderPhotos()}
            <p>Images by Flickr API</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
