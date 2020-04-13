import React from 'react'
import Word from './Word/Word'
import './WordsList.css'

export default class WordsList extends React.Component {
    render() {

        return(
            <ul className='words-list-ul'>
                {this.props.words.map(word => <Word key={word.id} word={word}/>)}
                <span>Total correct answers: {this.props.language.total_score}</span>
                <span>Total incorrect answers: 0</span>
            </ul>
        )
    }
}