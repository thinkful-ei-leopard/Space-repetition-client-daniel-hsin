import React from 'react'
import Word from './Word/Word'
import './WordsList.css'

export default class WordsList extends React.Component {
    render() {
        return(
            <ul className='words-list-ul'>
                {this.props.words.map(word => <Word word={word}/>)}
            </ul>
        )
    }
}