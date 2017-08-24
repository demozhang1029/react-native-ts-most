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
}

export const ProductDetailPopup = (props: ProductProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.img}>
				<Image source={{uri: props.img}}/>
			</View>
			<View style={styles.info}>
				<Text style={styles.left}>{props.title}</Text>
				<View style={styles.right}>
					<Price price={props.price} />
					<User name={props.owner} />
				</View>
			</View>
			<View style={styles.detail}>{props.details.split('\n').map((detail, index) => {
				return <Text key={index}>{detail}</Text>;
			})}</View>
			<ButtonWithColor title="立即购买" onPress={props.onClick}/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 20,
	},
	img: {
		height: 200,
		marginTop: 20,
		marginBottom: 20,
	},
	info: {
	},
	left: {
		marginLeft: '10%',
	},
	right: {
		marginLeft: '10%',
	},
	detail: {
		marginTop: 20,
		marginBottom: 50,
	}
});
