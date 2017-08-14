import * as React from 'react'
import { StyleSheet, View, Image } from 'react-native'
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
        this.props.onSubmit(this.state.username, this.state.password)
    }

    render() {
        return (
            <View style={[styles.loginPopup, ]}>
                <Header closeIcon={true} headerContext="注册" onPress={this.props.onIconClick}/>
                <Image style={styles.icon} source={require('./images/logo.png')}/>
                <View style={styles.content}>
                    <Form
                        ref="form"
                        style={styles.form}
                        type={User}
                        options={options}
                        onChange={this.onChange}
                        value={this.state}
                    />

                    <ButtonWithColor
                        style={styles.registerButton}
                        title="注册"
                        onPress={this.onSubmit}
                    />
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
    registerButton: {
        flex: 0.8,
    },
})
