import * as React from 'react'
import { StyleSheet, View, TextInput, TextInputProperties } from 'react-native'

interface InputProps extends TextInputProperties {
    mask: boolean
}

export const Input = (props: InputProps) => {
    const {mask, ...rest} = props
    return(
        <View style={styles.input}>
            {
                mask
                    ? <TextInput style={styles.text} secureTextEntry={true} {...rest} />
                    : <TextInput style={styles.text} {...rest} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: '#979797',
        borderBottomWidth: 1,
    },
    text: {
        textAlign: 'left',
        paddingLeft: 10,
    }
})