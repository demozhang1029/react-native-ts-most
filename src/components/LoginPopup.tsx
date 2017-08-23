import * as React from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import KeyboardSpace from 'react-native-keyboard-space'
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

    componentDidMount() {
    }

    onChange = (user: UserForLogin) => {
        this.setState({...user})
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
                    <Form
                        type={User}
                        options={options}
                        onChange={this.onChange}
                        value={this.state}
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
                    <KeyboardSpace/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        height: 150,
        resizeMode: 'contain',
    },
    content: {
        height: Dimensions.get('window').height - 64 - 44,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})
