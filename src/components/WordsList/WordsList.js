import React from 'react'
import Word from './Word/Word'
import './WordsList.css'

export default class WordsList extends React.Component {
    render() {

        return(
                <section>
                <h3>WORDS TO PRACTICE</h3>
                <ul className='words-list-ul'>
                {this.props.words.map(word => <Word key={word.id} word={word}/>)}
                </ul>
                <span>Total correct answers: {this.props.language.total_score}</span>
                </section>
            
        )
    }
}