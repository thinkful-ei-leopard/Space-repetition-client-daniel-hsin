import React, { Component } from 'react'
import config from '../../config'
import './DashboardRoute.css';
import Button from '../../components/Button/Button';
import TokenService from '../../services/token-service'
import WordsList from '../../components/WordsList/WordsList'
import { Link } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'

class DashboardRoute extends Component {
  static contextType = UserContext
  state = {
    error: null,
    words: [],
    language: {},
  }

  componentDidMount = () => {
    this.fetchWords()
      .then(obj => {
        this.setState({
          words: obj.words,
          language: obj.language
        })
      })
  }

  fetchWords = () => {
    return (
      fetch(`${config.API_ENDPOINT}/language`, {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json()
      }
        else if (res === {
          "error": "Unauthorized request"
      }) {
          this.handleUnauthorizedRequest()
      }
        return Promise.reject('Error fetching language and words from server');
      })
      .catch(err => {
        this.setState({error: err})
      })
    )
  }

  handleUnauthorizedRequest = () => {
    this.props.history.push('/login')
    this.context.processLogout()
  }



  render() {
    return (
      <section>
        <div className='background'>
        <h2>Ready to Learn {this.state.language.name}?</h2>
        </div>
        <Link to='/learn'>
        <Button type='button' >START PRACTICING</Button>
        </Link>
        <WordsList words={this.state.words} language={this.state.language}/>
      </section>
    );
  }
}

export default DashboardRoute
