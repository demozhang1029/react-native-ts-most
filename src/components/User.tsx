import * as React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
const user = require('./images/yellow-user-icon.png');

interface UserProps {
	name: string;
}

export default (props: UserProps) => (
	<View style={styles.container}>
		<Image style={styles.img} source={user}/>
		<Text style={styles.text}>{props.name}</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		height: 30,
	},
	img: {
		width: 25,
		height: 25,
	},
	text: {
		textAlign: 'left',
		textShadowColor: '#a9a9a9',
		lineHeight: 30,
		fontSize: 13,
	}
});