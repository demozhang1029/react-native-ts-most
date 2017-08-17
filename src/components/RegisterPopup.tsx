import * as React from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import KeyboardSpace from 'react-native-keyboard-space'
import * as t from 'tcomb-form-native'
const Form = t.form.Form
import { Header } from './Header'
import { ButtonWithColor } from './ButtonWithColor'

const User = t.struct({username: t.String, password: t.String, confirmPassword: t.String})
const options = {
    fields: {
        username: {
            placeholder: '用户名',
            auto: 'none',
            maxLength: 12
        },
        password: {
            placeholder: '密码',
            password: true,
            secureTextEntry: true,
            auto: 'none',
            maxLength: 12
        },
        confirmPassword: {
            placeholder: '确认密码',
            password: true,
            secureTextEntry: true,
            auto: 'none',
            maxLength: 12
        }
    }
}

interface RegisterPopupProps {
    onSubmit: (username: string, password: string) => void
    onIconClick: () => void
    isActive: boolean
}

interface RegisterPopupStates {
    username?: string
    password?: string
    confirmPassword?: string
}

export class RegisterPopup extends React.Component<RegisterPopupProps, RegisterPopupStates> {

    constructor(props: RegisterPopupProps) {
        super(props)
        this.state = {}
    }

    onChange = ({username: username, password: password, confirmPassword: confirmPassword}) => {
        this.setState({
            username: username,
            password: password,
            confirmPassword: confirmPassword
        })
    }

    onSubmit = () => {
        // TODO: Add validate
        this.props.onSubmit(this.state.username, this.state.password)
    }

    render() {
        return (
            <View>
                <Header closeIcon={true} headerContext="注册" onPress={this.props.onIconClick}/>
                <View style={styles.content}>
                    <Image style={styles.icon} source={require('./images/logo.png')}/>
                    <Form
                        ref="form"
                        type={User}
                        options={options}
                        onChange={this.onChange}
                        value={this.state}
                    />
                    <ButtonWithColor
                        title="注册"
                        onPress={this.onSubmit}
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
    }
})
