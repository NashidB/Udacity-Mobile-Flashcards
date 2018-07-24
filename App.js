import React from 'react'
import {  View, StatusBar, Platform } from 'react-native'
import { Constants } from 'expo'
import { createStore,  applyMiddleware } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import NewDeck from './componenets/NewDeck'
import { red, white } from './utils/colors'
import { FontAwesome } from '@expo/vector-icons'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import MainPage from './componenets/MainPage'
import DeckDetails from './componenets/DeckDetails'
import Quiz from './componenets/Quiz'
import NewCard from './componenets/NewCard'
import { setLocalNotification } from './utils/helpers';




function TopStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export const IOSMainNav = createStackNavigator({
  MainPage: {
    screen: IOSTabNav = createBottomTabNavigator({
      MainPage: {
        screen: MainPage , navigationOptions: {
          tabBarLabel: 'Home',
          tabBarIcon: () => <FontAwesome name='home' activeTintColor={red} size={25} />
        }
      },
      NewDeck: {
        screen: NewDeck, navigationOptions: {
          tabBarLabel: 'New Deck',
          tabBarIcon: () => <FontAwesome name='plus' size={25} Color={red} />,
          inactiveBackgroundColor: red,
        }
      },
    },
      {
        tabBarOptions: {
          activeTintColor: red,
          inactiveTintColor: 'black',
          inactiveBackgroundColor: 'rgba(0, 0, 0, 0.1)',
          labelStyle: {
            fontSize: 18,
            paddingBottom:10,
          },
          style: {
            paddingBottom:10,
            justifyContent: 'center',
            alignItems: 'center',
            height: 65,
            backgroundColor: white,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
              width: 3,
              height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1,
          }
        }
      }),
    navigationOptions: {
      header:null
    }
  },
  NewDeck: {
    screen: NewDeck
  },
  DeckDetails: {
    screen: DeckDetails,
  },
  Quiz: {
    screen: Quiz,
    mode:'card'
  },
  NewCard: {
    screen: NewCard,
    mode:'card'
  }
},{mode:'modal'})


const AndroidMainNav = createStackNavigator({
  MainPage: {
    screen: AndroidTabNav = createMaterialTopTabNavigator({
      MainPage: {
        screen: MainPage, navigationOptions: {
          tabBarLabel: 'Home'
        }
      },
      NewDeck: {
        screen: NewDeck, navigationOptions: {
          tabBarLabel: 'New Deck'
        }
      },
    }, {
        tabBarOptions: {
          activeBackgroundColor: 'rgba(0, 0, 0, 0.14)',
          activeTintColor: red,
          inactiveTintColor: 'black',
          tintColor: 'black',
          style: {
            height: 56,
            backgroundColor: white,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
          }
        }
      }),
    navigationOptions: {
      header:null
    }
  },
  NewDeck: {
    screen: NewDeck
  },
  DeckDetails: {
    screen: DeckDetails,
  },
  Quiz: {
    screen: Quiz,
    mode:'card'
  },
  NewCard: {
    screen: NewCard,
    mode:'card'
  }
})




  const MainTabNav = () => {
    return(
    Platform.OS === 'ios' ? <IOSMainNav /> : <AndroidMainNav />
  )
  } 

 
  
const store = createStore(
  reducer, composeWithDevTools(
    applyMiddleware(thunk),
  )
)

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={ store }>
        <View style={{ flex: 1 }}>
          <View>
            <TopStatusBar backgroundColor={red} barStyle='light-content' />
          </View>
          <MainTabNav />
        </View>
      </Provider>

    );
  }
}

