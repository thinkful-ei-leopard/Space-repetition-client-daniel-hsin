import React from 'react'

export default class Word extends React.Component {
    render () {
        console.log(this.props.word)
        return (
            <li>
                <span className='original'>{this.props.word.original}</span>
                <span className='translation'>{this.props.word.translation}</span>
                <span className='correct_count'>{this.props.word.correct_count}</span>
                <span className='incorrect_count'>{this.props.word.incorrect_count}</span>
            </li>
        )
    }
}