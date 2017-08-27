import * as React from 'react'
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
            tabBarLabel: '精选',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'ios-home-outline'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    others: {
        screen: PublishProductScreen,
        navigationOptions: {
            tabBarLabel: 'Upload',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'ios-add-circle-outline'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
            tabBarVisible: false,
        },
    },
    profile: {
        screen: profilePages,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: 'Profile',
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'ios-person-outline'}
                    size={26}
                    style={{color: tintColor}}
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
        inactiveBackgroundColor: '#FFEB3B',
    }
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