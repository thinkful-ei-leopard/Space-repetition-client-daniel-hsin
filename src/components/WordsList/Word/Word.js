import React from 'react'

export default class Word extends React.Component {
    render () {
        console.log(this.props.word)
        return (
            <li>
                <span>{this.props.word.original}</span>
                <span>{this.props.word.translation}</span>
                <span>{this.props.word.correct_count}</span>
                <span>{this.props.word.incorrect_count}</span>
            </li>
        )
    }
}