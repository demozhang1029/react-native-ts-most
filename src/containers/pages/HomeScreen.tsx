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
import {ProductDetailPopup} from "../../components/ProductDetailPopup";
import {buyProductAction} from "../../modules/products/actions";
import {BuyProduct} from "../../definitions";

interface HomePageProps extends DispatchProp<void> {
	getHomeProducts: typeof getHomeProducts;
	buyProduct: typeof buyProductAction;
	products: D.ProductDetail[];
	isLogin: boolean;
	user: D.User;
}

interface HomePageState {
	showLogin: boolean;
	showRegister: boolean;
	showHeader: boolean;
	displayProductIndex?: number;
}

export class HomeScreen extends React.Component<HomePageProps, HomePageState> {
	constructor(props) {
		super(props);
		this.state = {showLogin: false, showRegister: false, showHeader: true, displayProductIndex: undefined};
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

	buyProduct(product) {
		const {buyProduct, user} = this.props;
		buyProduct({
			sessionToken: user.sessionToken,
			productId: product.objectId
		})
		this.hideProductDetailPage();
		this.props.getHomeProducts();
	}

	displayProductDetailPage() {
		const {displayProductIndex} = this.state;
		if (!_.isUndefined(displayProductIndex)) {
			const product = _.get(this.props.products, displayProductIndex);
			return <ProductDetailPopup
				{...product}
				onClick={() => this.buyProduct(product)}
			/>
		}
	}

	hideProductDetailPage() {
		this.setState({displayProductIndex: undefined})
	}

	selectProduct(selectedIndex) {
		if (!this.props.isLogin) {
			this.switchToLoginOrRegister(true);
		} else {
			this.setState({displayProductIndex: selectedIndex})
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

	getHeader() {
		const {displayProductIndex} = this.state;
		const msg = _.isUndefined(displayProductIndex) ? '精选': '商品详情';
		return <Header
			headerContext={msg}
			closeIcon={!_.isUndefined(displayProductIndex)}
			onPress={() => this.hideProductDetailPage()}
		/>
	}

	render() {
		const {showHeader, showLogin, showRegister} = this.state;
		return (
			<View style={styles.container}>
				{showHeader && this.getHeader()}
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
		isLogin: state.app.logined,
		user: state.user,
		products: _.map(state.homeProducts.products, product => ({
			objectId: product.objectId,
			img: product.img,
			title: product.name,
			price: product.price,
			owner: product.owner.username,
			details: product.description
		}))
	}};

const mapDispatchToProps = (dispatch) => ({
	getHomeProducts: () => dispatch(getHomeProducts()),
	buyProduct: (product: BuyProduct) => dispatch(buyProductAction(product))
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
