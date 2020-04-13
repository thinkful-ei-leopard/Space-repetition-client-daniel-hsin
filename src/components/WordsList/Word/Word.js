import React from 'react'

export default class Word extends React.Component {
    render () {
        return (
            <li>
                <span>{this.props.word.original}</span>
                <span>{this.props.word.translation}</span>
            </li>
        )
    }
}