import { AsyncStorage } from 'react-native'
import { FLASHCARD_DB_KEY } from './helpers.js'

export function starterDecks (deck) {
    return AsyncStorage.setItem(FLASHCARD_DB_KEY, JSON.stringify({
        [deck.deckId]: deck
    })).catch(err => console.log(err))
}

export function addDeck (deck) {
    const deckObject = deck
    return AsyncStorage.mergeItem(FLASHCARD_DB_KEY, JSON.stringify(
        {[deck.deckId]:deck}
    )).then(() => deckObject).catch(err => console.log(err))
}

export function fetchAllDecks () {
    return AsyncStorage.getItem(FLASHCARD_DB_KEY).then(decks => Object.values(JSON.parse(decks))).catch(err => console.log(err))}

export function addCard (deckId, card) {
    return AsyncStorage.getItem(FLASHCARD_DB_KEY).then(stringifiedDecks => {
        let decks = JSON.parse(stringifiedDecks);
        let deckKeys = Object.keys(decks);

        deckKeys.forEach(deckKey => {
            let deck = decks[deckKey];
            if(deck.deckId === deckId)
                deck.cards = [...deck.cards, card]
        });
        let stringifiedUpdatedDecks = JSON.stringify(decks)
        AsyncStorage.setItem(FLASHCARD_DB_KEY, stringifiedUpdatedDecks).catch(err => console.log(err))
        return Object.values(decks)
    }).catch(err => console.log(err))
}

export function deleteAllDecks () {
    return AsyncStorage.clear()
}