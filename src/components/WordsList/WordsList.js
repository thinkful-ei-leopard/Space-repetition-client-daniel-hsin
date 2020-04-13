import React from 'react'
import Word from './Word/Word'
import './WordsList.css'

export default class WordsList extends React.Component {
    render() {
        function totalCorrect(arr) {
            let count = 0;
            for (let i = 0; i < arr.length; i++) {
                count = count + arr[i].correct_count;
            }
            return count
        }

        function totalIncorrect(arr) {
            let count = 0;
            for (let i = 0; i < arr.length; i++) {
                count = count + arr[i].correct_count;
            }
            return count
        }

        return(
            <ul className='words-list-ul'>
                {this.props.words.map(word => <Word key={word.id} word={word}/>)}
                <span>Total Times Correct: {totalCorrect(this.props.words)}</span>
                <span>Total Times Incorrect: {totalIncorrect(this.props.words)}</span>
            </ul>
        )
    }
}