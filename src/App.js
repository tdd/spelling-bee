import './App.scss'

import React, { useState } from 'react'
import { hasSpeechRecognition, listenForWord, speak } from './speech'
import { pickRandomWord, stripDiacritics } from './words'

import classnames from 'classnames'

const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz']
const VOWELS = 'aeiouy'

function App() {
  const [word, setWord] = useState('maxence')
  const normalizedWord = stripDiacritics(word)
  const [apart, setApart] = useState(false)
  const [speaking, setSpeaking] = useState(null)
  const [upperCase, setUpperCase] = useState(false)
  const [showAll, setShowAll] = useState(true)

  function defineWord(word) {
    setWord(word.toLowerCase())
    speakText(word)
  }

  function pickWord() {
    const newWord = pickRandomWord()
    setWord(newWord)
    speakText(newWord)
  }

  function speakText(text, { rate } = {}) {
    speak(text, {
      onEnd() {
        setSpeaking(null)
      },
      onStart() {
        setSpeaking(text)
      },
      rate,
    })
  }

  return (
    <div
      className={classnames('app', upperCase ? 'useUpperCase' : 'useLowerCase')}
    >
      <div className="controls">
        <button onClick={pickWord}>
          <span role="img" aria-label="Tirer un mot au hasard">
            🎱
          </span>
        </button>
        {hasSpeechRecognition() && (
          <button onClick={() => listenForWord(defineWord)}>
            <span role="img" aria-label="Saisie vocale">
              🎤
            </span>
          </button>
        )}
        <button onClick={() => speakText(word, { rate: 1 })}>🗣</button>
        <button className="toggle" onClick={() => setUpperCase(!upperCase)}>
          {upperCase ? 'a' : 'A'}
        </button>
        <button className="toggle" onClick={() => setApart(!apart)}>
          {apart ? '⇢⇠' : '⇠⇢'}
        </button>
        <button
          className="toggle trackCase"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'a, b' : 'a…z'}
        </button>
      </div>
      <div className="input">
        <input onChange={(e) => defineWord(e.target.value)} value={word} />
      </div>

      <div
        className={classnames('text', {
          apart,
          speaking: speaking === word,
        })}
      >
        {[...word].map((letter, index) => (
          <span
            className={classnames(isVowel(letter) ? 'vowel' : 'consonnant', {
              speaking: speaking === stripDiacritics(letter),
            })}
            key={index}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="letters">
        {ALPHABET.map((letter) => {
          if (!showAll && !normalizedWord.includes(letter)) {
            return null
          }
          return (
            <button
              className={classnames(isVowel(letter) ? 'vowel' : 'consonnant', {
                speaking: speaking === letter,
              })}
              disabled={!normalizedWord.includes(letter)}
              key={letter}
              onClick={() => speakText(letter)}
            >
              {letter}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function isVowel(letter) {
  return VOWELS.includes(letter)
}

export default App
