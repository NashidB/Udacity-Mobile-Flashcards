import React, { Component } from 'react'
import { TouchableOpacity,KeyboardAvoidingView,TextInput, Text, StyleSheet, Platform, Picker } from 'react-native'
import { connect } from 'react-redux'
import { white ,red} from '../utils/colors'
import {addNewCard} from '../actions'

import { Entypo} from '@expo/vector-icons'


  function SubmitBtn ({ onPress }) {
    return (
      <TouchableOpacity
        style={Platform.OS === 'ios' ? [styles.iosSubmitBtn, {bottom:80}] : styles.AndroidSubmitBtn}
        onPress={onPress}>
          <Text style={styles.submitBtnText}>SUBMIT</Text>
      </TouchableOpacity>
    )
  }

class NewCard extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          header:null
        }
      }

   state = {
     card : {
       question:'',
       answer: true
     }
  }

  grabCardQuetsion = (input) => {
    let card = {...this.state.card}
    card.question = input
    this.setState(() => ({ card }))
  }

  grabCardAnswer = (input) => {
    let card = {...this.state.card}
    if(input === 'true'){
      card.answer = true
    }
    if (input === 'false'){
      card.answer = false
    }
    this.setState(() => ({ card }))
  }

  submit = () => {
    if(this.state.card.question === ''){
      alert('Please provide a question first.')
    }
    else{
      const card = {...this.state.card}
      const deck = this.props.navigation.state.params 
      const deckId = deck.deckId
      this.props.addNewCard(deckId, card)
      this.props.navigation.navigate('DeckDetails', {deck:deck})
  }
  }

  toHome = () => {
    this.props.navigation.navigate('DeckDetails', {deckId:deckId})
  }

  componentDidMount () {
  }



  render() {

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TouchableOpacity style={{borderTopLeftRadius: 10,borderTopRightRadius: 10, flexDirection:'row', borderWidth:1,borderColor:'#efefef',backgroundColor:white}} onPress={() => this.props.navigation.goBack()}>
        <Text style={{alignSelf:'center',fontSize:20}}><Entypo  name="chevron-left" size={33} style={{color:red}} /></Text>
        </TouchableOpacity>
            <KeyboardAvoidingView behavior='padding' style={Platform.OS === 'ios' ? styles.iosRow : styles.androidRow}>
                <KeyboardAvoidingView behavior='padding'>
                    <Text style={{fontSize:20,marginBottom:10}}>Question</Text>
                    <TextInput   onChangeText={this.grabCardQuetsion}  style={{backgroundColor: white,height:50, width:280, marginBottom:20, padding:7,borderRadius:5, borderColor:red, borderWidth:1}}/>
                    <Text style={{fontSize:20,marginBottom:10}}>Pick Answer: Correct/Incorrect</Text>
                    <Picker
                      selectedValue={this.state.card.answer ? 'true' : 'false'}
                      mode='dropdown'
                      style={{width: 280, height:110 }}
                      itemStyle={{backgroundColor:white,color:red,borderBottomColor:red,borderRadius:10,borderColor:red, borderWidth:1, height:110}}
                      onValueChange={(itemValue) => this.grabCardAnswer(itemValue)} >
                      <Picker.Item label="Correct" value="true" />
                      <Picker.Item label="Incorrect" value="false" />
                    </Picker>
                </KeyboardAvoidingView>
                <SubmitBtn onPress={this.submit} />
            </KeyboardAvoidingView>
        </KeyboardAvoidingView>
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
    justifyContent: 'center',
    position: 'absolute',
    alignItems:'center',
    alignSelf:'center',
  },
  AndroidSubmitBtn: {
    backgroundColor: 'transparent',
    borderWidth:2,
    borderColor:red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginRight:25,
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
  addNewCard: (deckId,card) => dispatch(addNewCard(deckId,card))
})

export default connect(null, mapDispatchToProps)(NewCard)