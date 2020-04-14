import React from 'react'
import './Word.css'

export default class Word extends React.Component {
    render () {
        console.log(this.props.word)
        return (
            <li>
                <div className='word'>
                <span className='original'>{this.props.word.original}</span>
                <span className='translation'>{this.props.word.translation}</span>
                </div>
                <div className='count'>
                <span className='correct_count'>correct answer count: {this.props.word.correct_count}</span><br></br>
                <span className='incorrect_count'>incorrect answer count: {this.props.word.incorrect_count}</span>
                </div>
            </li>
        )
    }
}