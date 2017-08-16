import * as React from 'react'
import { StyleSheet, View, Image, TouchableHighlight, Text } from 'react-native'

interface HeaderProps {
    closeIcon?: boolean
    goBackIcon?: boolean
    headerContext: string
    onPress?: () => void
}

export const Header = (props: HeaderProps) => (
    <View style={styles.header}>
        <TouchableHighlight style={styles.icon} onPress={props.onPress}>
            {renderIcon(props.closeIcon, props.goBackIcon)}
        </TouchableHighlight>
        <Text style={styles.spaceFlex1}/>
        <Text style={styles.title}>{props.headerContext}</Text>
        <Text style={styles.spaceFlex2}/>
    </View>
)

const renderIcon = (closeIcon: boolean, goBackIcon: boolean) => {
    if (closeIcon) {
        return <Image style={styles.iconImage} source={require('./images/close.png')}/>
    }
    if (goBackIcon) {
        return <Image style={styles.iconImage} source={require('./images/arrow.png')}/>
    }
    return <View />
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 44,
        marginTop: 20,
        justifyContent: 'center',
    },
    icon: {
        flex: 1,
        alignSelf: 'center',
        paddingLeft: 10,
    },
    iconImage: {
        height: 35,
        width: 35,
    },
    spaceFlex1: {
        flex: 1,
    },
    spaceFlex2: {
        flex: 2,
    },
    title: {
        flex: 2,
        textAlign: 'center',
        fontSize: 18,
        alignSelf: 'center',
    },
})