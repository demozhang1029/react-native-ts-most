import * as React from 'react'
import { View } from 'react-native'
import { DispatchProp } from 'react-redux'
import { Header } from '../../components/Header'
import WithProductList from '../../components/enhancer/WithProductList'
import { boughtProductsAction } from '../../modules/products/actions'

interface ProductsProps extends DispatchProp<void> {
    styles: object
    onBackButton: () => void
}

class BoughtProductsScreen extends React.Component<ProductsProps> {
    constructor(props: ProductsProps) {
        super(props)
    }

    render() {
        return (
            <View style={this.props.styles}>
                <Header
                    headerContext="已买宝贝"
                    goBackIcon={true}
                    onPress={this.props.onBackButton}
                />
                {this.props.children}
            </View>
        )
    }
}

export default WithProductList(BoughtProductsScreen, {
    action: boughtProductsAction,
    stateName: 'boughtProducts'
})