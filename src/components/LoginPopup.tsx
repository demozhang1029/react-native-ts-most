import * as React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import * as t from 'tcomb-form-native'
const Form = t.form.Form
import { Header } from './Header'
import { ButtonWithColor } from './ButtonWithColor'
import { UserForLogin } from '../definitions'

const User = t.struct({username: t.String, password: t.String})
const options = {
    fields: {
        username: {
            placeholder: '用户名',
            auto: 'none',
            keyboardType: 'name-phone-pad'
        },
        password: {
            placeholder: '密码',
            auto: 'none',
            password: true,
            secureTextEntry: true,
            maxLength: 12
        }
    }
}

interface LoginPopupProps {
    onSubmit: (username: string, password: string) => void
    goToRegister: () => void
    onIconClick: () => void
    isActive: boolean
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

    onChange = (user: UserForLogin) => {
        this.setState({...user})
    }

    onSubmit = () => {
        // TODO: Add validate
        this.props.onSubmit(this.state.username, this.state.password)
    }

    render() {
        const { username, password } = this.state
        const isLoginBtnEnabled = username && password

        return (
            <View style={[styles.loginPopup, ]}>
                <Header closeIcon={true} headerContext="请登录" onPress={this.props.onIconClick}/>
                <Image style={styles.icon} source={require('./images/logo.png')}/>
                <View style={styles.content}>
                    <KeyboardAwareView>
                        <Form
                            ref="form"
                            style={styles.form}
                            type={User}
                            options={options}
                            onChange={this.onChange}
                            value={this.state}
                        />
                        <View style={styles.loginButtons}>
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
                    </KeyboardAwareView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loginPopup: {
        marginBottom: 30,
        alignItems: 'center'
    },
    icon: {
        height: 200,
        resizeMode: 'contain',
        alignItems: 'center'
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    form: {
        flex: 0.8,
    },
    loginButtons: {
        flex: 0.8,
    },
})
