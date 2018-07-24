import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet, Platform ,KeyboardAvoidingView, TextInput} from 'react-native'
import { connect } from 'react-redux'
import { red, white } from '../utils/colors'
import {addNewDeck} from '../actions/index'

import { getRandomNumber } from '../utils/helpers'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>ADD DECK</Text>
    </TouchableOpacity>
  )
}
class NewDeck extends Component {
  state = {
    deck : {
      deckId: 'Deck' + getRandomNumber(),
      deckTitle: '',
      cards : []
      }
  }

  grabDeckTitle = (input) => {
    let deck = {...this.state.deck}
    deck.deckTitle = input
    this.setState(() => ({ deck }))
  }
  
  submit = () => {
    const newDeck = {...this.state.deck}
    this.props.addNewDeck(newDeck)
    let resetDeck = {...this.state.deck}
    this.props.navigation.navigate('MainPage')
    setTimeout(() => {
      this.props.navigation.navigate(
        'DeckDetails',
        {deck: resetDeck}
      );
    }, 200);
    this.resetDeckState()
  }

  resetDeckState = () => {
    setTimeout(() => {
      let resetDeck = {...this.state.deck}
      resetDeck.deckTitle = ''
      resetDeck.deckId = 'Deck' + getRandomNumber()
      console.log('state reset')
      this.setState(() => ({ deck: resetDeck }))
    },500)
  }

  toHome = () => {
    
  }

  render() {

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <KeyboardAvoidingView behavior='padding' style={styles.row}>
                    <Text style={{fontSize:20,marginBottom:10}}>
                        Deck Title
                    </Text>
                    <TextInput onChangeText={this.grabDeckTitle} style={{backgroundColor: '#ededed',height:50, width:280, marginBottom:20, padding:7,borderRadius:5, borderColor:red, borderWidth:1}}/>
                    <SubmitBtn onPress={this.submit} />
            </KeyboardAvoidingView>
            
            
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    justifyContent:'center',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: red,
    padding: 10,
    width:170,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginRight:25,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

const mapDispatchToProps = dispatch => ({
  addNewDeck: (id,deck) => dispatch(addNewDeck(id,deck))
})


export default connect(null, mapDispatchToProps)(NewDeck)