import React from 'react'
import './Word.css'

export default class Word extends React.Component {
    render () {
        console.log(this.props.word)
        return (
            <li>
                <h4 className='original'>{this.props.word.original}</h4>
                <span className='translation'>{this.props.word.translation}</span>
                <span className='correct_count'>correct answer count: {this.props.word.correct_count}</span>
                <span className='incorrect_count'>incorrect answer count: {this.props.word.incorrect_count}</span>
            </li>
        )
    }
}