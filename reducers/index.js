import { combineReducers } from 'redux'
import {ADD_NEW_DECK,ADD_NEW_CARD,GET_ALL_DECKS,GET_SINGLE_DECK} from '../actions';
import { setStarterDecks, startingDeck } from '../utils/helpers'

export const initalAppState = {
    decks: [],
    singleDeck: {}
}

function allDecks  (state = initalAppState, action) {
    switch (action.type){
        case ADD_NEW_DECK:
        let newDeck = {...action.deckObject}
         return{
             decks: [...state.decks, newDeck],
             singleDeck: newDeck
        }
        case ADD_NEW_CARD:
        let editedSingleDeck = action.decks.filter(deck => deck.deckId === action.deckId)
         return{
            decks: action.decks,
            singleDeck: editedSingleDeck[0]
        }
        case GET_ALL_DECKS:
        let decks = undefined
        if (action.decks === undefined) {
            setStarterDecks(startingDeck)
            decks = [startingDeck]   
        }
        else if(action.decks.length > 0) {
            decks = action.decks
        }
         return{
             decks: decks,
             singleDeck: state.singleDeck
        }
        case GET_SINGLE_DECK:
        let singleDeck = state.decks.filter(deck => deck.deckId === action.deckId)
         return{
             decks: state.decks,
             singleDeck: singleDeck[0]
        }
        default :
            return state
    } 
}

export default combineReducers({
    allDecks
  })