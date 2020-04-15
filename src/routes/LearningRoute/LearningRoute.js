import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import { Input, Required, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import './LearningRoute.css'

class LearningRoute extends Component {
  static contextType = UserContext
 
  state={
    error:null,
    nextWord:'',
    answer:null,
    checkAns:''
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
        guess: guessWord
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
    this.postAns(guessWord)
     .then(ans=>{
       guessWord.value=''
      
     })
     .catch(res =>{
       this.setState({
         error:JSON.stringify(res.error)
       })
     })
      
  }

  handleNextWord=(event)=>{
    event.preventDefault();
    this.getWord()
    .then( nextWord=> this.setState({
      nextWord
    }))
    .catch(res => this.setState({
      error:JSON.stringify(res.error)
    }))
  }
  
    
  render() {
    const{error, nextWord, answer, checkAns}=this.state
    let message = '' ;
    let color = '' ;
    if(checkAns === true){
       color= 'green';
       message ='Correct Answer!'
     }else{
      color= 'red';
      message ='Wrong Answer!'
     }
     
    return (
    
      <section>
        {error && <p>{error}</p>}
        <form onSubmit={this.handleSubmit}>
        <h2>{nextWord.nextWord}</h2>
        <Label htmlFor='guessWord'>Your Answer<Required />
        </Label>
        <Input type='text' id='guessWord' name='guessWord' required></Input>
        <Button type='submit'>Submit </Button>
        
         
         {answer && <div className='showAns'><h3 className={color}>{message}</h3><h3>The Correct Answer is: {answer}</h3><Button onClick={this.handleNextWord} type='click'>Next word</Button></div>}

        <p>Current total score: {nextWord.totalScore}</p>
        <p className='correct_count'>Current correct count : {nextWord.wordCorrectCount}</p>
        <p className='incorrect_count'>Current incorrect count :  {nextWord.wordIncorrectCount}</p>
        </form>
      </section>
    );
  }
}

export default LearningRoute
