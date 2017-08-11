import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface PriceProps {
	price: string;
}

export default (props: PriceProps) => (
	<View style={styles.container}>
		<Text style={styles.text}>{props.price}</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		height: 30,
		paddingLeft: 5,
	},
	text:{
		lineHeight: 30,
		color: '#e1a536',
		textAlign: 'left',
	}
});

