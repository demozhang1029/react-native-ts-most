import * as React from 'react'
import { StyleSheet, View, Text, TouchableHighlight, TouchableHighlightProperties } from 'react-native'

interface ButtonWithColorProps extends TouchableHighlightProperties {
    isGreyButton?: boolean
    title: string
}

export const ButtonWithColor = (props: ButtonWithColorProps) => {
    const buttonColor = props.isGreyButton ? styles.grayButton : styles.yellowButton
    return (
        <View style={[styles.buttonWithColorView, buttonColor, styles.buttonWithColorButton]}>
            <TouchableHighlight onPress={props.onPress}>
                <Text style={styles.buttonText}>{props.title}</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonWithColorView: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonWithColorButton: {
        borderWidth: 0,
        borderRadius: 5,
        padding: 10,
    },
    yellowButton: {
        backgroundColor: '#FFEB3B',
    },
    grayButton: {
        backgroundColor: '#E2E2E2',
    },
    buttonText: {
        fontSize: 20,
    }
})