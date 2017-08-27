import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { StyleSheet, View, TextInput, Dimensions } from 'react-native'
import * as _ from 'lodash'
import { User, DraftProduct } from '../../definitions'
import { uploadProductImage, publishProduct } from '../../modules/publishProduct/actions'
import { ImageUploader } from '../../components/ImageUploader'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { ButtonWithColor } from '../../components/ButtonWithColor'
import { LoginPopup } from '../../components/LoginPopup'
import { RegisterPopup } from '../../components/RegisterPopup'
import { userLogin, userRegister } from '../../modules/user/actions'

export type PublishProductScreenPageProps = DispatchProp<void> & {
    user: User
    currentImageUrl: string
    logined: boolean
}

interface PublishProductStates extends DraftProduct {
    showLogin: boolean
    showRegister: boolean
}

class PublishProductScreen extends React.Component<PublishProductScreenPageProps, PublishProductStates> {
    constructor(props: PublishProductScreenPageProps) {
        super(props)
        this.state = {
            name: '',
            price: '',
            img: '',
            description: '',
            showLogin: !this.props.logined,
            showRegister: false,
        }
    }

    componentDidMount() {
        this._showOrHideoginPopup(this.props.user.username)
    }

    componentWillReceiveProps(nextProps: PublishProductScreenPageProps) {
        this._showOrHideoginPopup(nextProps.user.username)
    }

    _uploadImage = (fileData: string) => {
        this.props.dispatch(uploadProductImage(this.props.user, fileData))
    }

    _publishProd = () => {
        const product = {
            ...this.state,
            img: this.props.currentImageUrl
        }
        this.props.dispatch(publishProduct(this.props.user, product))
        this.props.dispatch(NavigationActions.navigate({routeName: 'homePage'}))
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

    _onRegisterClose = () => {
        this._showOrHideoginPopup(this.props.user.username)
    }

    _goToRegister = () => {
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

    _renderPopup = () => {
        if (this.state.showLogin) {
            return (
                <LoginPopup
                    onSubmit={this.onLoginUser}
                    goToRegister={this._goToRegister}
                    onIconClick={() => this.props.dispatch(NavigationActions.navigate({routeName: 'homePage'}))}
                    onHideTabBar={() => {}}
                />
            )
        } else if (this.state.showRegister) {
            return (
                <RegisterPopup
                    onSubmit={this.onRegisterUser}
                    onIconClick={this._onRegisterClose}
                    onHideTabBar={() => {}}
                />)
        } else {
            return null
        }
    }

    _renderPage = () => {
       return (
           <View>
            <Header
                closeIcon={true}
                onPress={() => this.props.dispatch(NavigationActions.back())}
                headerContext="发布宝贝"
            />
            <View>
                <ImageUploader
                    uploadImage={this._uploadImage}
                />
                <View style={styles.publish__input_group}>
                    <Input
                        mask={false}
                        placeholder="商品名称"
                        onChangeText={text => this.setState({name: text})}
                    />
                    <Input
                        mask={false}
                        placeholder="售价￥"
                        onChangeText={text => this.setState({price: text})}
                    />
                    <TextInput
                        placeholder="添加描述..."
                        multiline={true}
                        style={styles.input_group__textarea}
                        onChangeText={text => this.setState({description: text})}
                    />
                    <View style={styles.input_group__button}>
                        <ButtonWithColor
                            title="开始出售"
                            onPress={this._publishProd}
                        />
                    </View>
                </View>
            </View>
        </View>
       )
    }

    render() {
        const {showLogin, showRegister} = this.state
        return (
            <View>
                {(!showLogin && !showRegister) && this._renderPage()}
                {this._renderPopup()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        currentImageUrl: _.get(state, 'publishProducts.currentImageUrl'),
        logined: state.app.logined,
    }
}

const styles = StyleSheet.create({
    publish__input_group: {
        height: Dimensions.get('window').height - 120 - 44 - 64,
        paddingLeft: 50,
        paddingRight: 50,
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    input_group__button: {
        alignItems: 'center'
    },
    input_group__textarea: {
        height: 150,
        borderColor: '#979797',
        borderWidth: 1,
    },
})

export default connect(mapStateToProps)(PublishProductScreen)