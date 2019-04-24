import React, { Component } from "react"
import './App.css';
import Card from './components/Card'

class App extends Component {

  state = {
    currentDeckId: null,
    drawnCards: [],
    outOfCards: false
  }

  createDeck = () => {
    this.setState({
      drawnCards: [],
      outOfCards: false
    })
    fetch('http://localhost:3000/api/v1/decks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        cards_attributes: [
          {value: 'ACE', suit: 'SPADES', code: 'AS'},
          {value: '2', suit: 'SPADES', code: '2S'},
          {value: '3', suit: 'SPADES', code: '3S'},
          {value: '4', suit: 'SPADES', code: '4S'},
          {value: '5', suit: 'SPADES', code: '5S'},
          {value: '6', suit: 'SPADES', code: '6S'},
          {value: '7', suit: 'SPADES', code: '7S'},
          {value: '8', suit: 'SPADES', code: '8S'},
          {value: '9', suit: 'SPADES', code: '9S'},
          {value: '10', suit: 'SPADES', code: '10S'},
          {value: 'JACK', suit: 'SPADES', code: 'JS'},
          {value: 'QUEEN', suit: 'SPADES', code: 'QS'},
          {value: 'KING', suit: 'SPADES', code: 'KS'},
          {value: 'ACE', suit: 'HEARTS', code: 'AH'},
          {value: '2', suit: 'HEARTS', code: '2H'},
          {value: '3', suit: 'HEARTS', code: '3H'},
          {value: '4', suit: 'HEARTS', code: '4H'},
          {value: '5', suit: 'HEARTS', code: '5H'},
          {value: '6', suit: 'HEARTS', code: '6H'},
          {value: '7', suit: 'HEARTS', code: '7H'},
          {value: '8', suit: 'HEARTS', code: '8H'},
          {value: '9', suit: 'HEARTS', code: '9H'},
          {value: '10', suit: 'HEARTS', code: '10H'},
          {value: 'JACK', suit: 'HEARTS', code: 'JH'},
          {value: 'QUEEN', suit: 'HEARTS', code: 'QH'},
          {value: 'KING', suit: 'HEARTS', code: 'KH'},
          {value: 'ACE', suit: 'DIAMONDS', code: 'AD'},
          {value: '2', suit: 'DIAMONDS', code: '2D'},
          {value: '3', suit: 'DIAMONDS', code: '3D'},
          {value: '4', suit: 'DIAMONDS', code: '4D'},
          {value: '5', suit: 'DIAMONDS', code: '5D'},
          {value: '6', suit: 'DIAMONDS', code: '6D'},
          {value: '7', suit: 'DIAMONDS', code: '7D'},
          {value: '8', suit: 'DIAMONDS', code: '8D'},
          {value: '9', suit: 'DIAMONDS', code: '9D'},
          {value: '10', suit: 'DIAMONDS', code: '10D'},
          {value: 'JACK', suit: 'DIAMONDS', code: 'JD'},
          {value: 'QUEEN', suit: 'DIAMONDS', code: 'QD'},
          {value: 'KING', suit: 'DIAMONDS', code: 'KD'},
          {value: 'ACE', suit: 'CLUBS', code: 'AC'},
          {value: '2', suit: 'CLUBS', code: '2C'},
          {value: '3', suit: 'CLUBS', code: '3C'},
          {value: '4', suit: 'CLUBS', code: '4C'},
          {value: '5', suit: 'CLUBS', code: '5C'},
          {value: '6', suit: 'CLUBS', code: '6C'},
          {value: '7', suit: 'CLUBS', code: '7C'},
          {value: '8', suit: 'CLUBS', code: '8C'},
          {value: '9', suit: 'CLUBS', code: '9C'},
          {value: '10', suit: 'CLUBS', code: '10C'},
          {value: 'JACK', suit: 'CLUBS', code: 'JC'},
          {value: 'QUEEN', suit: 'CLUBS', code: 'QC'},
          {value: 'KING', suit: 'CLUBS', code: 'KC'}
        ]
      })
    })
    .then(response => response.json())
    .then(parsedResponse => this.setState({currentDeckId: parsedResponse.id}))
  }

  drawCards = () => {
    this.setState({drawnCards: []})
    fetch(`http://localhost:3000/api/v1/decks/${this.state.currentDeckId}/draw`)
    .then(response => response.json())
    .then(parsedResponse => {
      if (!parsedResponse.length) {
        this.setState({outOfCards: true})
      }
      else {
        setTimeout(() => this.setState({drawnCards: [...this.state.drawnCards, parsedResponse[0]]}), 50)
        setTimeout(() => this.setState({drawnCards: [...this.state.drawnCards, parsedResponse[1]]}), 100)
        setTimeout(() => this.setState({drawnCards: [...this.state.drawnCards, parsedResponse[2]]}), 150)
        setTimeout(() => this.setState({drawnCards: [...this.state.drawnCards, parsedResponse[3]]}), 200)
        setTimeout(() => this.setState({drawnCards: [...this.state.drawnCards, parsedResponse[4]]}), 250)
      }
    })
  }

  conditionalMessageRender = () => {
    if (!this.state.currentDeckId) {
      return (
        <>
          <p>CLICK MY MAGICAL GLOWING CARD TO DEAL A NEW DECK OF CARDS.</p>
          <button onClick={this.createDeck}></button>
        </>
      )
    }
    else if (!this.state.outOfCards) {
      return (
        <>
          <p>CLICK MY MAGICAL GLOWING CARD TO DRAW FIVE CARDS.</p>
          <button onClick={this.drawCards}></button>
        </>
      )
    }
    else {
      return (
        <>
          <p>YOU'RE OUT OF CARDS! CLICK MY MAGICAL GLOWING CARD TO DEAL A NEW DECK.</p>
          <button onClick={this.createDeck}></button>
        </>
      )
    }
  }

  conditionalCardRender = () => {
    if (this.state.drawnCards.length > 0) {
      return (
        <div className='card-grid-container'>
          {this.state.drawnCards.map(card => <Card key={card.code} card={card} />)}
        </div>
      )
    }
    else if (this.state.currentDeckId && !this.state.outOfCards) {
      return (
        <img id='card-back' src={require('./images/card-back.jpg')} alt='card-back'/>
      )
    }
    else {
      return null
    }
  }

  render() {
    return (
      <div id='main-div'>
        <div>
          <img id='dealer-gif' src={require('./images/card-dealer.png')} alt='card'/>
          <img id='speech-bubble' src={require('./images/square-speech-bubble.png')} alt='speech' />
        {this.conditionalMessageRender()}
        </div>
        <div id='card-table'>
          {this.conditionalCardRender()}
        </div>
      </div>
    )
  }
}

export default App;
