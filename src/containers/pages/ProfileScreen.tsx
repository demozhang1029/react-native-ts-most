import * as React from 'react'
import * as _ from 'lodash'
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
    user: D.User
}

interface ProfileStates {
    showLogin: boolean
    showRegister: boolean
}

class ProfileScreen extends React.Component<ProfileProps, ProfileStates> {
    constructor(props: ProfileProps) {
        super(props)
        this.state = {
            showLogin: true,
            showRegister: false
        }
    }

    componentDidMount() {
        this._showOrHideoginPopup(this.props.user.username)
    }

    componentWillReceiveProps(nextProps: ProfileProps) {
        this._showOrHideoginPopup(nextProps.user.username)
    }

    _showOrHideoginPopup = (username: string) => {
        if (!_.isEmpty(username)) {
            this.setState({
                showLogin: false,
                showRegister: false,
            })
        } else {
            this.setState({
                showLogin: true,
                showRegister: false,
            })
        }
    }

    onRegisterClose = () => {
        this._showOrHideoginPopup(this.props.user.username)
    }

    onLoginClose = () => {
        this.props.dispatch(NavigationActions.back())
    }

    goToRegister = () => {
        this.setState({
            showLogin: false,
            showRegister: true
        })
    }

    onLoginUser = (username: string, password: string) => {
        this.props.dispatch(userLogin({username, password}))
    }

    onRegisterUser = (username: string, password: string) => {
        this.props.dispatch(userRegister({username, password}))
    }

    _renderContent = () => {
        return (
            <View>
                <Header headerContext="个人信息"/>
                <View style={styles.container}>
                    <PersonalInfo name={this.props.user.username}/>
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
                            this.props.dispatch(NavigationActions.navigate({routeName: 'homePage'}))
                        }}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <View>
                {
                    (!this.state.showLogin && !this.state.showRegister) && this._renderContent()
                }
                {
                    this.state.showLogin
                        ? <LoginPopup
                            onSubmit={this.onLoginUser}
                            isActive={true}
                            goToRegister={this.goToRegister}
                            onIconClick={this.onLoginClose}
                        />
                        : this.state.showRegister
                        ? <RegisterPopup
                            onSubmit={this.onRegisterUser}
                            isActive={true}
                            onIconClick={this.onRegisterClose}
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