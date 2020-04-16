import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import './LearningRoute.css'

class LearningRoute extends Component {
  static contextType = UserContext
 
  state={
    error:null,
    nextWord:'',
    answer:null,
    checkAns:'',
    showForm:true,
    guess:null
  }

  
    getWord=()=>{
      return fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      }
    })
    .then(res =>
      (!res.ok)
         ? res.json().then(e=> Promise.reject(e))
         : res.json()
      )
    }

    postAns=(guessWord)=>{
      let word = JSON.stringify({
        guess: guessWord.toLowerCase()
      })
      return fetch(`${config.API_ENDPOINT}/language/guess`, {
        method:'POST',
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
          'content-type': 'application/json'
        },
        body: word,
      })
      .then(res => {
        if (!res.ok) {
           return res.json().then(e=> Promise.reject(e))
        }
         return res.json()
      })
      .then(data => {
        console.log(data)
        this.setState({
          answer:data.answer
        })
        this.setState({
          checkAns:data.isCorrect
        })
      })
    }
    
  componentDidMount(){ 
    this.getWord()
      .then( nextWord=> this.setState({
        nextWord
      }))
      .catch(res => this.setState({
        error:JSON.stringify(res.error)
      }))
  }

  handleSubmit=(event)=>{
    event.preventDefault();
    const guessWord = event.target.guessWord.value
    this.setState({
      guess:guessWord
    })
    this.postAns(guessWord)
     .then(ans=>{
       guessWord.value=''
     })
     .catch(res =>{
       this.setState({
         error:JSON.stringify(res.error)
       })
     })
    
     this.setState({
       showForm:false,
     })
      
  }

  handleNextWord=(event)=>{
    event.preventDefault();
    this.setState({
      answer:null,
      showForm:true,
      guess:null
    })
    
    this.getWord()
    .then( nextWord=> this.setState({
      nextWord
    }))
    .catch(res => this.setState({
      error:JSON.stringify(res.error)
    }))
  }
  
    
  render() {
    const{error, nextWord, answer, checkAns, showForm, guess}=this.state
    let message = '' ;
    let color = '' ;
    if(checkAns === true){
       color= 'green';
       message ='You were correct! :D'
     }else{
      color= 'red';
      message ='Good try, but not quite right :('
     }
     
    return (
      
      <section>
        
        {error && <p>{error}</p>}
        {showForm && 
        <form onSubmit={this.handleSubmit}>
        <h2>Translate the word:</h2><span className='showWord'>{nextWord.nextWord}</span>
        <Label htmlFor='learn-guess-input'>What's the translation for this word?
        </Label><br></br>
        <Input type='text' id='learn-guess-input' name='guessWord' value={guess} required></Input>
        <Button type='submit'>Submit your answer</Button>
        <p className='correct_count'> You have answered this word correctly {nextWord.wordCorrectCount} times.</p>
        <p className='incorrect_count'>You have answered this word incorrectly {nextWord.wordIncorrectCount} times.</p>
        </form>}
         
         {answer && <div className='showAns'><h2 className={color}>{message}</h2><session className='DisplayFeedback'><p>The correct translation for {nextWord.nextWord} was {answer} and you chose {guess}!</p></session>
         <Button onClick={this.handleNextWord} type='click'>Try another word!</Button></div>}
        <section className='DisplayScore'>
        <p>Your total score is: {nextWord.totalScore}</p>
        </section>
        </section>
      
    );
  }
}

export default LearningRoute
