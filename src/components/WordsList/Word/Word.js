import React from 'react'
import './Word.css'

export default class Word extends React.Component {
    render () {
        console.log(this.props.word)
        return (
            <li>
                <span className='original'>{this.props.word.original}</span>
                <span className='translation'>{this.props.word.translation}</span>
                <span className='correct_count'>Times Correct: {this.props.word.correct_count}</span>
                <span className='incorrect_count'>Times Incorrect: {this.props.word.incorrect_count}</span>
            </li>
        )
    }
}