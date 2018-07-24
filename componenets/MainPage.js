import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { deleteAllDecks } from '../utils/api'
import { white ,red} from '../utils/colors'
import {getAllDecks} from '../actions'
import { DeckDetails } from './DeckDetails'
import { NavigationActions } from 'react-navigation'



class MainPage extends Component {
  state = {
  }

  componentDidMount () {
    this.props.getAllDecks()
    // deleteAllDecks()
  }

  render() {
    return (
      <View style={styles.container}>
            <ScrollView>
             {this.props.decks.map(deck => {
               return (
                <View key={deck.deckTitle} style={styles.deck}>
                  <View style={Platform.OS === 'ios' ? styles.iosRow : styles.androidRow}>
                    <Text style={{fontSize:22,fontWeight:'bold'}}> {deck.deckTitle} </Text>                
                    <Text style={{paddingBottom:10}}>{deck.cards.length === 0 ? ' No cards' : deck.cards.length + ' Cards'}</Text>
                    <TouchableOpacity
                      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                      onPress={() => this.props.navigation.navigate('DeckDetails', {deck:deck})}
                      >
                    <Text style={styles.submitBtnText} >Open Deck</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )})}
            </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  iosRow: {
    flex: 1,
    backgroundColor:'#efefef',
    padding:15,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 10
  },
  androidRow: {
    flex: 1,
    backgroundColor:'#efefef',
    padding:15,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth:1,
    borderColor:'#222'
  },
  deck: {
    flex:1,
    margin:10, 
    borderRadius:5,
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
  },
  AndroidSubmitBtn: {
    backgroundColor: 'transparent',
    borderWidth:2,
    borderColor:red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: red,
    fontSize: 22,
    textAlign: 'center',
  }
})

const mapDispatchToProps = dispatch => ({
  getAllDecks: () => dispatch(getAllDecks())
})

const mapStateToProps = state => ({
  decks: state.allDecks.decks
})

export default connect(mapStateToProps,mapDispatchToProps)(MainPage)