import * as api from '../utils/api';
export const FLASHCARD_DB_KEY = 'FlashCards:cards'
import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'MobileFlashCards:notifications'

export function getRandomNumber () {
    return Math.floor(Math.random() * 100000) + 0
}

export const startingDeck = 
                {
                deckId:'Deck32355',
                deckTitle: 'React',
                cards: [
                        {
                            question: 'Did Facebook create React?',
                            answer: true
                        },
                        {
                            question: 'Does React Only Work On Web?',
                            answer: false
                        },
                        {
                            question: 'Does React use JSX?',
                            answer: true
                        }
                    ]
                }
            

export function setStarterDecks(starterDecks) {
        api.starterDecks(starterDecks).then(console.log('Starter Decks Set')).catch(err => console.log(err));
}

  
  export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  
  function createNotification () {
    return {
      title: 'Ready for some Quizzing?',
      body: "👋 Let's Do IT",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }
  
  export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
            if(!data){
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()
                        let tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate() + 1)
                        tomorrow.setHours(20)
                        tomorrow.setMinutes(0)
        
                        Notifications.scheduleLocalNotificationAsync(
                        createNotification(),
                        {
                            time: tomorrow,
                            repeat: 'day',
                        }
                        )
        
                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                    })
                }
            }
        console.log('Notification Reset for tomrrow')
      })
  }
  

