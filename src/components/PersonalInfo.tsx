import * as React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

interface PersonalInfoProps {
    name: string
    avatar?: string
}

export const PersonalInfo = (props: PersonalInfoProps) => (
    <View style={styles.personalInfo}>
        {renderPersonAvatar(props.avatar)}
        <Text style={styles.name}>{props.name}</Text>
    </View>
)

const renderPersonAvatar = (personAvatar: string) => {
    if (!!personAvatar) {
        return (<Image style={styles.avatar} source={{uri: personAvatar}} />)
    } else {
        return (<Image style={styles.avatar} source={require('./images/logo.png')} />)
    }
}

const styles = StyleSheet.create({
    personalInfo: {
        flexDirection: 'row',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 40,
        marginRight: 40,
        shadowColor: '#CAC4C4',
        shadowOffset: { width: 2.5, height: 2 },
        borderWidth: 1,
        borderColor: 'white',
        shadowOpacity: 0.8,
    },
    avatar: {
        flex: 1,
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    name: {
        flex: 1,
        fontSize: 18,
        height: 25,
    }
})