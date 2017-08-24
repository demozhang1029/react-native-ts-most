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
    user: D.User,
    logined: boolean
}

interface ProfileStates {
    showLogin: boolean
    showRegister: boolean
}

class ProfileScreen extends React.Component<ProfileProps, ProfileStates> {
    constructor(props: ProfileProps) {
        super(props)
        this.state = {
            showLogin: !this.props.logined,
            showRegister: false
        }
    }

    componentDidMount() {
        this._showOrHideoginPopup(this.props.user.username)
        this._hideTabBar(this.props)
    }

    componentWillReceiveProps(nextProps: ProfileProps) {
        this._showOrHideoginPopup(nextProps.user.username)
        this._hideTabBar(nextProps)
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
                            this.props.dispatch(NavigationActions.navigate({routeName: 'boughtProducts'}))
                        }}
                    />
                    <ButtonWithColor
                        title="出售宝贝"
                        onPress={() => {
                            this.props.dispatch(NavigationActions.navigate({routeName: 'soldoutProducts'}))
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

    _hideTabBar = (props) => {
        const tabBarVisible = props.logined
        const setParamsAction = NavigationActions.setParams({
            params: { tabBarVisible },
            key: 'profile',
        })
        this.props.dispatch(setParamsAction)
    }

    _renderPopup = () => {
        if (this.state.showLogin) {
            return (
                <LoginPopup
                    onSubmit={this.onLoginUser}
                    goToRegister={this.goToRegister}
                    onIconClick={this.onLoginClose}
                    onHideTabBar={this._hideTabBar.bind(this, this.props)}
                />
            )
        } else if (this.state.showRegister) {
            return (
                <RegisterPopup
                    onSubmit={this.onRegisterUser}
                    onIconClick={this.onRegisterClose}
                    onHideTabBar={this._hideTabBar.bind(this, this.props)}
                />)
        } else {
            return null
        }
}

    render() {
        return (
            <View>
                {(!this.state.showLogin && !this.state.showRegister) && this._renderContent()}
                {this._renderPopup()}
            </View>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        logined: state.app.logined,
    })
)(ProfileScreen)

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height - 44 - 64,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
})