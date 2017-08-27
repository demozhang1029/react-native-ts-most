import { StackNavigator } from 'react-navigation'
import ProfileScreen from '../containers/pages/ProfileScreen'
import SoldoutProductsScreen from '../containers/pages/SoldoutProductsScreen'
import BoughtProductsScreen from '../containers/pages/BoughtProductsScreen'

const profilePages = StackNavigator({
    profile: {
        screen: ProfileScreen,
        navigationOptions: {
            header: null,
            headerTintColor: 'white',
        },
    },
    soldoutProducts: {
        screen: SoldoutProductsScreen,
        navigationOptions: {
            header: null,
            headerTintColor: 'white',
        },
    },
    boughtProducts: {
        screen: BoughtProductsScreen,
        navigationOptions: {
            header: null,
            headerTintColor: 'white',
        },
    }
}, {
    cardStyle: {
        backgroundColor: 'white'
    }
})

export {
    profilePages
}