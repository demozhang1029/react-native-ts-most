import * as React from 'react'
import * as _ from 'lodash';
import {StyleSheet, View, ScrollView} from 'react-native'
import {connect, DispatchProp} from 'react-redux'

import * as D from '../../definitions';
import {Product} from "../../components/Product";
import {Header} from "../../components/Header";
import {getHomeProducts} from "../../modules/home/actions";
import {LoginPopup} from "../../components/LoginPopup";
import {RegisterPopup} from "../../components/RegisterPopup";

interface HomePageProps extends DispatchProp<void> {
	getHomeProducts: typeof getHomeProducts;
	products: D.ProductDetail[];
	isLogin: boolean;
}

interface HomePageState {
	showLogin: boolean;
	showRegister: boolean;
	showHeader: boolean;
	productDetail: object;
}

export class HomeScreen extends React.Component<HomePageProps, HomePageState> {
	constructor(props) {
		super(props);
		this.state = {showLogin: false, showRegister: false, showHeader: true, productDetail: {}};
	}

	componentDidMount() {
		this.props.getHomeProducts();
	}

	switchToLoginOrRegister(showLogin) {
		this.setState({showLogin, showRegister: !showLogin, showHeader: false});
	}

	switchBack() {
		this.setState({showLogin: false, showRegister: false, showHeader: true});
	}

	displayProductDetailPage() {
	}

	selectProduct(index) {
		if (!this.props.isLogin) {
			this.switchToLoginOrRegister(true);
		} else {
			this.setState({productDetail: _.get(this.props.products, index)})
		}
	}

	displayLoginPage(showLogin) {
		if (showLogin) {
			return <LoginPopup
				onSubmit={() => this.switchBack()}
				goToRegister={() => this.switchToLoginOrRegister(false)}
				onIconClick={() => this.switchBack()}
				onHideTabBar={() => this.setState({showHeader: false})}
			/>
		}
	}

	displayRegisterPage(showRegister) {
		if (showRegister) {
			return <RegisterPopup
				onSubmit={() => this.switchToLoginOrRegister(true)}
				onIconClick={() => this.switchBack()}
				onHideTabBar={() => this.setState({showHeader: false})}
			/>
		}
	}

	displaySelectedProductPage() {
		return (
			<ScrollView style={styles.view}>
				{
					this.props.products.map((product, index) => {
						return <Product
							title={product.name}
							img={product.img}
							price={product.price}
							owner={product.owner}
							key={index}
							onClick={() => this.selectProduct(index)}
						/>
					})
				}
			</ScrollView>
		)
	}

	render() {
		const {showHeader, showLogin, showRegister} = this.state;
		return (
			<View style={styles.container}>
				{showHeader && <Header headerContext="精选"/>}
				{
					this.displayLoginPage(showLogin) ||
					this.displayRegisterPage(showRegister) ||
					this.displayProductDetailPage() ||
					this.displaySelectedProductPage()
				}
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
