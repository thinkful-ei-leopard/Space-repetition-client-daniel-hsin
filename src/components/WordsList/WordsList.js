import React from 'react'
import Word from './Word/Word'

export default class WordsList extends React.Component {
    render() {
        return(
            <ul>
                {this.props.words.map(word => <Word word={word}/>)}
            </ul>
        )
    }
}