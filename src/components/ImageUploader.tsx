import * as React from 'react'
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native'

interface ImageProps {
    uploadImage: (fileData: string) => void
}

const upload = (e, callback) => {
    const file = e.target.files[0]
    callback(file)
}

export const ImageUploader = (props: ImageProps) => (
        <TouchableHighlight
            onPress={() => console.log('upload')}
        >
            <View style={styles.imageUploader}>
                <Text style={styles.text}>点击上传图片</Text>
                <Image style={styles.image} source={require('./images/arrow_up_upload.png')} />
            </View>
        </TouchableHighlight>
)

const styles = StyleSheet.create({
    imageUploader: {
        backgroundColor: '#F6F3F3',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 120,
        flexDirection: 'column',
    },
    image: {
        width: 50,
        height: 50,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    }
})