import * as React from 'react'
import {StyleSheet, View, ScrollView, Text} from 'react-native'
import {connect, DispatchProp} from 'react-redux'
import {Product} from "../../components/Product";
import {popularProducts} from "../../mock_datas/popularProducts";

const styles = StyleSheet.create({
	container: {
		marginTop: 50,
		backgroundColor: '#fff',
	},
	header: {
		textAlign: 'center',
		fontSize: 20,
	},
	view: {
		marginTop: 20,
		paddingLeft: 30,
		paddingRight: 30,
	}
});

class HomePageScreen extends React.Component<DispatchProp<{}>, {}> {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.header}>精选</Text>
				<ScrollView style={styles.view}>
					{
						popularProducts.map((product, index) => {
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

export default connect()(HomePageScreen)