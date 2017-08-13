import * as React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {connect, DispatchProp} from 'react-redux'
import {Product} from "../../components/Product";
import {popularProducts} from "../../mock_datas/popularProducts";
import {Header} from "../../components/Header";

const styles = StyleSheet.create({
	container: {
		top: 50,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

class HomePageScreen extends React.Component<DispatchProp<{}>, {}> {
	render() {
		return (
			<View style={styles.container}>
				<Header headerContext="精选" closeIcon={true}/>
				<ScrollView>
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