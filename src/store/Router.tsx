import * as React from 'react'
import { Image } from 'react-native'
import * as _ from 'lodash'
import {
  NavigationActions,
  TabNavigator,
} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeScreen from '../containers/pages/HomeScreen'
import PublishProductScreen from '../containers/pages/PublishProductScreen'
import { profilePages } from './profilePages'

const Route = TabNavigator({
    homePage: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../components/images/home.png')}
                    style={{width: 26, height: 26, tintColor: tintColor}}
                />
            ),
        },
    },
    others: {
        screen: PublishProductScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../components/images/plus.png')}
                    style={{width: 26, height: 26, tintColor: tintColor}}
                />
            ),
            tabBarVisible: false,
        },
    },
    profile: {
        screen: profilePages,
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../components/images/person.png')}
                    style={{width: 26, height: 26, tintColor: tintColor}}
                />
            ),
            tabBarVisible: _.get(navigation.state.params, 'tabBarVisible'),
        }),
    },
}, {
    initialRouteName: 'homePage',
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: 'black',
        activeBackgroundColor: 'white',
        inactiveTintColor: 'black',
        inactiveBackgroundColor: '#FFEB3B',
        showLabel: false,
    },
})

const initialRouterAction = NavigationActions.init()

const initialState = Route.router.getStateForAction(initialRouterAction, null)

export const reducer = (state = initialState, action) => {
  let nextState
  // Simply return the original `state` if `nextState` is null or undefined.
  switch (action.type) {
    
    default:
      nextState = Route.router.getStateForAction(action, state)
  }
  return nextState || state
}

export default Route