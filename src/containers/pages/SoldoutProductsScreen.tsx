import * as React from 'react'
import { NavigationActions } from 'react-navigation'
import { View } from 'react-native'
import { DispatchProp } from 'react-redux'
import { Header } from '../../components/Header'
import WithProductList from '../../components/enhancer/WithProductList'
import { soldProductsAction } from '../../modules/products/actions'

interface ProductsProps extends DispatchProp<void> {
    styles: object
}

class SoldoutProductsScreen extends React.Component<ProductsProps> {
    constructor(props: ProductsProps) {
        super(props)
    }

    render() {
        return (
            <View style={this.props.styles}>
                <Header
                    headerContext="出售宝贝"
                    goBackIcon={true}
                    onPress={() => {
                        this.props.dispatch(NavigationActions.back())
                    }}
                />
                {this.props.children}
            </View>
        )
    }
}

export default WithProductList(SoldoutProductsScreen, {
    action: soldProductsAction,
    stateName: 'soldProducts'
})