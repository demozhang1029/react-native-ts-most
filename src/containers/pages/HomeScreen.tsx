import * as React from 'react'
import * as _ from 'lodash';
import {StyleSheet, View, ScrollView} from 'react-native'
import {connect, DispatchProp} from 'react-redux'

import * as D from '../../definitions';
import {Product} from "../../components/Product";
import {Header} from "../../components/Header";
import {getHomeProducts} from "../../modules/home/actions";
import {NavigationActions} from "react-navigation";

interface HomeProps extends DispatchProp<void> {
	getHomeProducts: typeof getHomeProducts;
	products: D.ProductDetail[];
	isLogin: boolean;
	navigate: typeof NavigationActions.navigate;
}

export class HomeScreen extends React.Component<HomeProps> {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getHomeProducts();
	}

	onLogin() {

	}

	goToRegister() {

	}

	showProductDetail(index) {
		// if (!this.props.isLogin) {
			this.props.navigate({
				routeName: 'LoginPopup',
				params: {
					onSubmit: this.onLogin,
					goToRegister: this.goToRegister,
					onIconClick: () => {},
					onHideTabBar: () => {}
				},
			});
		// }
	}

	render() {
		const {products} = this.props;
		return (
			<View style={styles.container}>
				<Header headerContext="精选"/>
				<ScrollView style={styles.view}>
					{
						products.map((product, index) => {
							return <Product
								title={product.name}
								img={product.img}
								price={product.price}
								owner={product.owner}
								key={index}
								onClick={() => this.showProductDetail(index)}
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
		isLogin: !_.isEmpty(state.user.sessionToken),
		products: _.map(state.homeProducts.products, product => ({
			img: product.img,
			title: product.name,
			price: product.price,
			owner: product.owner.username,
			details: product.description
		}))
	}};

const mapDispatchToProps = (dispatch) => ({
	getHomeProducts: () => dispatch(getHomeProducts()),
	navigate: (params) => dispatch(NavigationActions.navigate(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	view: {
		marginTop: 20,
		paddingLeft: 30,
		paddingRight: 30,
	}
});
