import * as React from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import KeyboardSpace from 'react-native-keyboard-space'
import { Header } from './Header'
import { ButtonWithColor } from './ButtonWithColor'
import { Input } from "./Input"

interface RegisterPopupProps {
    onSubmit: (username: string, password: string) => void
    onIconClick: () => void
    onHideTabBar: () => void
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

    onSubmit = () => {
        // TODO: Add validate
        this.props.onSubmit(this.state.username, this.state.password)
        this.props.onHideTabBar()
    }

    onClose = () => {
        this.props.onHideTabBar()
        this.props.onIconClick()
    }

    render() {
        return (
            <View>
                <Header closeIcon={true} headerContext="注册" onPress={this.onClose}/>
                <View style={styles.content}>
                    <Image style={styles.icon} source={require('./images/logo.png')}/>
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
                        <Input
                            mask={true}
                            placeholder="确认密码"
                            autoCapitalize={'none'}
                            onChangeText={(text) => {this.setState({confirmPassword: text})}}
                        />
                        <ButtonWithColor
                            title="注册"
                            onPress={this.onSubmit}
                        />
                        <KeyboardSpace/>
                    </View>
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
    },
})
