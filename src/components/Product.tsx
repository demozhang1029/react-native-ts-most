import * as React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

interface ProductProps {
	title: string;
	img: string;
}

export const Product = (props: ProductProps) => {
	return (
		<View>
			<Image source={{uri: props.img}} style={style.img}/>
			<Text>{props.title}</Text>
		</View>
	);
};

const style = StyleSheet.create({
	img: {
		width: 200,
		height: 200
	}
});
