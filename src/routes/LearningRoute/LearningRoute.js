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
    answer:null
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
      return fetch(`${config.API_ENDPOINT}/language/guess`, {
        method:'POST',
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
          'content-type': 'application/json'
        },
        body:JSON.stringify(
          guessWord
        ),
      })
      .then(res =>
        (!res.ok)
           ? res.json().then(e=> Promise.reject(e))
           : res.json()
        )
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
    const {guessWord} = event.target
    this.postAns({
      guessWord: guessWord.value
    })
     .then(ans=>{
       guessWord.value=''  
     })
     .catch(res =>{
       this.setState({
         error:JSON.stringify(res.error)
       })
     })
      
  }
  
    
  render() {
    const{error, nextWord, answer}=this.state
    return (
      <section>
        {error && <p>{error}</p>}
        <form onSubmit={this.handleSubmit}>
        <h2>{nextWord.nextWord}</h2>
        <Label htmlFor='guessWord'>Your Answer<Required />
        </Label>
        <Input type='text' id='guessWord' name='guessWord' required></Input>
        <Button type='submit'>Submit </Button>
         {answer && <h3>{answer}</h3>}
        <p>Current total score: {nextWord.totalScore}</p>
        <p className='correct_count'>Current correct count : {nextWord.wordCorrectCount}</p>
        <p className='incorrect_count'>Current incorrect count :  {nextWord.wordIncorrectCount}</p>
        </form>
      </section>
    );
  }
}

export default LearningRoute
