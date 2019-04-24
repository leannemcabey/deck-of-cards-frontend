import React, { Component } from "react"

class Card extends Component {

  conditionalDetailsRender = () => {
    switch (this.props.card.suit) {
      case 'HEARTS':
        return (
          <div className='red'>
            <h3>{this.props.card.value[0]}</h3>
            {this.conditionalSuitImageRender()}
          </div>
        )
      case 'SPADES':
        return (
          <div className='black'>
            <h3>{this.props.card.value[0]}</h3>
            {this.conditionalSuitImageRender()}
          </div>
        )
      case 'CLUBS':
        return (
          <div className='black'>
            <h3>{this.props.card.value[0]}</h3>
            {this.conditionalSuitImageRender()}
          </div>
        )
      case 'DIAMONDS':
        return (
          <div className='red'>
            <h3>{this.props.card.value[0]}</h3>
            {this.conditionalSuitImageRender()}
          </div>
        )
      default:
        return null
    }
  }

  conditionalSuitImageRender = () => {
    switch (this.props.card.suit) {
      case 'HEARTS':
        return <img src={require(`../images/HEARTS.png`)} alt='hearts'/>
      case 'SPADES':
        return <img src={require(`../images/SPADES.png`)} alt='spades'/>
      case 'CLUBS':
        return <img src={require(`../images/CLUBS.png`)} alt='clubs'/>
      case 'DIAMONDS':
        return <img src={require(`../images/DIAMONDS.png`)} alt='diamonds'/>
      default:
        return null
    }
  }

  render() {
    return (
      <div className='card-grid-item details-grid-container'>
        <div className='details-grid-item left'>
          {this.conditionalDetailsRender()}
        </div>
        <div className='details-grid-item center'>
          {this.conditionalSuitImageRender()}
        </div>
        <div className='details-grid-item flip'>
          {this.conditionalDetailsRender()}
        </div>
      </div>
    )
  }
}

export default Card
