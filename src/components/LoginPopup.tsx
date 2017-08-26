import * as React from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import KeyboardSpace from 'react-native-keyboard-space'
import { Header } from './Header'
import { ButtonWithColor } from './ButtonWithColor'
import { Input } from './Input'

interface LoginPopupProps  {
    onSubmit: (username: string, password: string) => void
    goToRegister: () => void
    onIconClick: () => void
    onHideTabBar: () => void
}

interface LoginPopupStates {
    username?: string
    password?: string
}

export class LoginPopup extends React.Component<LoginPopupProps, LoginPopupStates> {

    constructor(props: LoginPopupProps) {
        super(props)
        this.state = {}
    }

    onSubmit = () => {
        this.props.onHideTabBar()
        // TODO: Add validate
        this.props.onSubmit(this.state.username, this.state.password)
    }

    onClose = () => {
        this.props.onIconClick()
    }

    render() {
        const { username, password } = this.state
        const isLoginBtnEnabled = username && password

        return (
            <View>
                <Header closeIcon={true} headerContext="请登录" onPress={this.onClose}/>
                <View style={styles.content}>
                    <View>
                        <Image style={styles.icon} source={require('./images/logo.png')}/>
                    </View>
                    <View style={styles.form}>
                        <Input
                            mask={false}
                            placeholder="用户名"
                            autoCapitalize={'none'}
                            onChangeText={(text) => {this.setState({username: text})}}
                        />
                        <Input
                            mask={true}
                            placeholder="密码"
                            autoCapitalize={'none'}
                            onChangeText={(text) => {this.setState({password: text})}}
                        />
                        <ButtonWithColor
                            title="登陆"
                            isGreyButton={!isLoginBtnEnabled}
                            onPress={this.onSubmit}
                        />
                        <ButtonWithColor
                            title="免费注册"
                            onPress={this.props.goToRegister}
                        />
                    </View>
                    <KeyboardSpace/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        height: 120,
        resizeMode: 'contain',
    },
    content: {
        paddingTop: 20,
        height: Dimensions.get('window').height - 64 - 44,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    form: {
        height: Dimensions.get('window').height - 64 - 44 - 120,
        paddingLeft: 50,
        paddingRight: 50,
        justifyContent: 'space-around',
        flexDirection: 'column',
    }
})
