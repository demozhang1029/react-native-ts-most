import * as React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import Price from "./Price";
import User from "./User";
import {ButtonWithColor} from "./ButtonWithColor";

interface ProductProps {
	img: string;
	title: string;
	price: string;
	owner: string;
	details: string;
	onClick: () => void;
	onBack: () => void;
}

export const ProductDetailPopup = (props: ProductProps) => {
	return (
		<View style={styles.container}>
			<Image style={styles.img} source={{uri: props.img}}/>
			<View style={styles.info}>
				<Text style={styles.left}>{props.title}</Text>
				<View style={styles.right}>
					<Price price={props.price}/>
					<User name={props.owner}/>
				</View>
			</View>
			<View style={styles.detail}>
				{props.details.split('\n').map((detail, index) => {
					return <Text key={index}>{detail}</Text>;
				})}
			</View>
			<ButtonWithColor title="立即购买" onPress={props.onClick}/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		marginLeft: 20,
		marginRight: 20,
		marginBottom: 20,
	},
	img: {
		width: 280,
		height: 200,
		marginBottom: 20,
	},
	info: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 50,
	},
	left: {
		fontWeight: 'bold',
		fontSize: 30,
		height: 60,
		textAlign: 'left',
	},
	right: {
		flexDirection: 'column',
	},
	detail: {
		marginBottom: 50,
	}
});
