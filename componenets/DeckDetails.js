import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { white ,red} from '../utils/colors'
import {getOneDeck} from '../actions/index'
import FontAwesome from '../node_modules/@expo/vector-icons/FontAwesome';
import {clearLocalNotification, setLocalNotification} from '../utils/helpers';

class DeckDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
    return {
      title: deck.deckTitle,
      header:null
    }
  }

   state = {
    deckLoaded: false,
    deck: '',
    cards: []
  }


  componentDidMount () {
    this.props.getOneDeck(this.props.navigation.state.params.deck.deckId)
  }

  startQuiz = (cards) =>{
    if(cards.length === 0)
    {
      alert("This Deck has no cards, Add a card.")
    }
    else if(cards.length > 0){
    clearLocalNotification()
      .then(setLocalNotification)
    this.props.navigation.navigate('Quiz', cards)  
  } 
  }


  render() {
    const deck = this.props.singleDeck
    const cards = this.props.singleDeck.cards

    return (
      <View style={styles.container}>
      <TouchableOpacity style={{borderTopLeftRadius: 10,borderTopRightRadius: 10,borderWidth:1,borderColor:'#efefef',backgroundColor:white}} onPress={() => this.props.navigation.goBack()}>
          <FontAwesome  name="angle-double-down" size={30} style={{alignSelf:'center',alignItems: 'center'}} />
        </TouchableOpacity>
        {this.props.singleDeck !== undefined ? 
        <View style={Platform.OS === 'ios' ? styles.iosRow : styles.androidRow}>
          <View style={{flex:1, alignItems: 'center'}}>
            <Text style={{fontSize:27,fontWeight:'bold'}}>{deck.deckTitle}</Text>
            {this.props.singleDeck.cards === undefined ? null : <Text style={{paddingBottom:10}}>{deck.cards.length === 0 ? ' No cards' : deck.cards.length + ' Cards'}</Text>}
          </View>
          <View style={{flex:3}}>
            <TouchableOpacity
              style={Platform.OS === 'ios' ? [styles.iosSubmitBtn, {bottom:140}] : [styles.AndroidSubmitBtn, {bottom:145}]}
              onPress={() => this.props.navigation.navigate('NewCard', deck)}
              ><Text style={styles.submitBtnText} >Add Card</Text>
            </TouchableOpacity>
            {this.props.singleDeck.cards === undefined ? null:
            <View style={{flex:1}}>
            <TouchableOpacity
              style={Platform.OS === 'ios' ? [styles.iosSubmitBtn, {bottom:75}] : [styles.AndroidSubmitBtn, {bottom:75}]}
              onPress={() => this.startQuiz(deck.cards)}
              ><Text style={styles.submitBtnText} >Start Quiz</Text>
            </TouchableOpacity>
            </View>}
          </View>
        </View> : <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom:0,
    backgroundColor: red
  },
  iosRow: {
    flex: 1,
    backgroundColor:'#efefef',
    padding:15,
    paddingBottom:0,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  androidRow: {
    flex: 1,
    backgroundColor:'#efefef',
    padding:15,
    alignSelf: 'stretch',
    alignItems: 'center',
    
  },
  deck: {
    flex:1,
    margin:10, 
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    shadowColor:'#222',
    shadowOpacity:0.4,
    alignItems:'center'
    
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  iosSubmitBtn: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor:red,
    padding: 5,
    width:170,
    borderRadius: 50,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center',
    position: 'absolute',
    alignItems:'center',
    alignSelf:'center',
  },
  AndroidSubmitBtn: {
    backgroundColor: 'transparent',
    borderWidth:2,
    borderColor:red,
    marginRight:25,
    height: 45,
    width:170, 
    borderRadius: 2,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center',
    position: 'absolute',
    alignItems:'center',
    alignSelf:'center',
  },
  submitBtnText: {
    color: red,
    fontSize: 22,
    textAlign: 'center',
  }
})

const mapDispatchToProps = dispatch => ({
  getOneDeck: (deckId) => dispatch(getOneDeck(deckId))
})

const mapStateToProps = state => ({
  singleDeck: state.allDecks.singleDeck,
  decks: state.allDecks.decks
})


export default connect(mapStateToProps,mapDispatchToProps)(DeckDetails)
