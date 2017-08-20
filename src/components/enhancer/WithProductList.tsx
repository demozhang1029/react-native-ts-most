import * as React from 'react'
import * as _ from 'lodash'
import { StyleSheet, ScrollView } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { User, ProductDetail } from '../../definitions'
import { Product } from '../../components/Product'

interface WithProductsListProps extends DispatchProp<void> {
    getProducts: any
    products: ProductDetail[],
    user: User
}

interface Options {
    action: any
    stateName: string
}

interface ProductsProps extends DispatchProp<void> {
    styles: object
}

const WithProductList = (Screen: React.Component<ProductsProps>, options: Options) => {

    class ProductsScreen extends React.Component<WithProductsListProps> {
        constructor(props: WithProductsListProps) {
            super(props)
        }

        componentDidMount() {
            this.props.getProducts(this.props.user)
        }

        render() {
            return (
                <Screen styles={styles.container}>
                    <ScrollView style={styles.view}>
                        {
                            this.props.products.map((product, index) => {
                                return <Product
                                    title={product.name}
                                    img={product.img}
                                    price={product.price}
                                    owner={product.owner}
                                    key={index}
                                />
                            })
                        }
                    </ScrollView>
                </Screen>
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            products: _.map(state[options.stateName].products, product => ({
                img: product.img,
                title: product.name,
                price: product.price,
                owner: product.owner.username,
                details: product.description
            })),
            user: state.user
        }
    }

    const mapDispatchToProps = (dispatch) => ({
        getProducts: (user: User) => dispatch(options.action(user))
    })

    return connect(mapStateToProps, mapDispatchToProps)(ProductsScreen)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    view: {
        marginTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
    }
})

export default WithProductList