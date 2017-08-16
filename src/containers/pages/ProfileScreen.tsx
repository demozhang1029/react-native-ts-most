import * as React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import * as D from '../../definitions'
import { userLogin, userLogout, userRegister } from '../../modules/user/actions'

import { PersonalInfo } from '../../components/PersonalInfo'
import { Header } from '../../components/Header'
import { ButtonWithColor } from '../../components/ButtonWithColor'
import { LoginPopup } from '../../components/LoginPopup'
import { RegisterPopup } from '../../components/RegisterPopup'

export type ProfileProps = DispatchProp<void> & {
    user: D.User,
    isUserLogin: boolean,
}

interface ProfileStates {
    showLogin: boolean
    showRegister: boolean
}

class ProfileScreen extends React.Component<ProfileProps, ProfileStates> {
    constructor(props: ProfileProps) {
        super(props)
        this.state = {
            showLogin: false,
            showRegister: false
        }
    }

    componentDidMount() {
        const {isUserLogin} = this.props
        if (!isUserLogin) {
            this.setState({
                showLogin: true
            })
        }
    }

    render() {
        return (
            <View>
                {
                    (!this.state.showLogin && !this.state.showRegister)
                    &&
                    <View>
                        <Header headerContext="个人信息"/>
                        <View style={styles.container}>
                            <PersonalInfo name="Yangjie"/>
                            <ButtonWithColor
                                title="已买宝贝"
                                onPress={() => {
                                    this.props.dispatch(NavigationActions.navigate({routeName: 'bought-products'}))
                                }}
                            />
                            <ButtonWithColor
                                title="出售宝贝"
                                onPress={() => {
                                    this.props.dispatch(NavigationActions.navigate({routeName: 'sold-out'}))
                                }}
                            />
                            <ButtonWithColor
                                title="退出登陆"
                                onPress={() => {
                                    this.props.dispatch(userLogout(this.props.user))
                                    this.props.dispatch(NavigationActions.navigate({routeName: 'home'}))
                                }}
                            />
                        </View>
                    </View>
                }
                {
                    this.state.showLogin
                        ? <LoginPopup
                            onSubmit={this.props.dispatch.bind(null, userLogin)}
                            isActive={true}
                            goToRegister={
                                () => this.setState({
                                    showLogin: false,
                                    showRegister: true
                                })
                            }
                            onIconClick={() => this.setState({showLogin: false})}
                        />
                        : this.state.showRegister
                        ? <RegisterPopup
                            onSubmit={this.props.dispatch.bind(null, userRegister)}
                            isActive={true}
                            onIconClick={() => this.setState({showRegister: false})}
                        />
                        : null
                }
            </View>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
    })
)(ProfileScreen)

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height - 44 - 64,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
})