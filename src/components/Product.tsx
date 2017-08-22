import * as React from 'react';
import {StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native';
import Price from "./Price";
import User from "./User";

interface ProductProps {
	title: string;
	img: string;
	price: string;
	owner?: string;
	onClick: () => void;
}

export const Product = (props: ProductProps) => {
	return (
		<View>
			<TouchableHighlight underlayColor={'transparent'} onPress={props.onClick}>
				<View style={styles.container}>
					<Image source={{uri: props.img}} style={styles.img}/>
					<View style={styles.info}>
						<Text style={styles.text}>{props.title}</Text>
						<Price price={props.price}/>
						<User name={props.owner}/>
					</View>
				</View>
			</TouchableHighlight>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	img: {
		width: 150,
		height: 200,
		marginRight: 20,
	},
	info: {
		width: 150,
		alignItems: 'center',
	},
	text: {
		textAlign: 'left',
		fontSize: 15,
		fontWeight: 'bold',
	}
});
