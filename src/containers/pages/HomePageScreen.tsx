import * as React from 'react'
import * as _ from 'lodash';
import {StyleSheet, View, ScrollView} from 'react-native'
import {connect, DispatchProp} from 'react-redux'

import * as D from '../../definitions';
import {Product} from "../../components/Product";
import {Header} from "../../components/Header";
import {getHomeProducts} from "../../modules/home/actions";

interface HomePageProps extends DispatchProp<void> {
	getHomeProducts: typeof getHomeProducts;
	products: D.ProductDetail[];
}

class HomePageScreen extends React.Component<HomePageProps> {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getHomeProducts();
	}

	render() {
		return (
			<View style={styles.container}>
				<Header headerContext="精选"/>
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
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		products: _.map(state.homeProducts.products, product => ({
			img: product.img,
			title: product.name,
			price: product.price,
			owner: product.owner.username,
			details: product.description
		}))
	}};

const mapDispatchToProps = (dispatch) => ({
	getHomeProducts: () => dispatch(getHomeProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageScreen);

const styles = StyleSheet.create({
	container: {
		marginTop: 50,
		backgroundColor: '#fff',
	},
	view: {
		marginTop: 20,
		paddingLeft: 30,
		paddingRight: 30,
	}
});
