import * as api from '../utils/api';

export const ADD_NEW_DECK = "ADD_NEW_DECK";
export const ADD_NEW_CARD = "ADD_NEW_CARD";
export const GET_ALL_DECKS = "GET_ALL_DECKS";
export const GET_SINGLE_DECK = "GET_SINGLE_DECK";

export const addNewDeck = (deck) => dispatch => {
    api.addDeck(deck).then(deckObject => {
    dispatch({
        type: "ADD_NEW_DECK",
        deckObject
    })}).catch(err => console.log(err))
}

export const getAllDecks = () => dispatch => {
    api.fetchAllDecks().then(decks =>
        dispatch( {
            type: GET_ALL_DECKS,
            decks  
        })
    ) 
}


export const getOneDeck = (deckId) => dispatch => {
    dispatch({
        type: GET_SINGLE_DECK,
        deckId
    })

}

export const addNewCard = (deckId,card) => dispatch => {
    api.addCard(deckId,card)
    .then(decks => 
        dispatch({
            type: ADD_NEW_CARD,
            decks,
            deckId
        })
    )
}



