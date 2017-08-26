import * as React from 'react'
import * as _ from 'lodash'
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native'
import { ImagePicker } from 'expo'

interface ImageProps {
    uploadImage: (fileData: string) => void
}

interface ImageState {
    img: string
}

export class ImageUploader extends React.Component<ImageProps, ImageState> {
    constructor(props: ImageProps) {
        super(props)
        this.state = {
            img: ''
        }
    }

    upload = async (callback) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        })

        if (!result.cancelled) {
            callback(result.uri)
            this.setState({ img: result.uri })
        }
    }

    render() {
        return (
            <TouchableHighlight
                onPress={() => this.upload(this.props.uploadImage)}
            >
                {
                    _.isEmpty(this.state.img)
                        ? (<View style={styles.imageUploader}>
                              <Text style={styles.text}>点击上传图片</Text>
                              <Image style={styles.image} source={require('./images/arrow_up_upload.png')}/>
                          </View>)
                        : (<Image
                              style={styles.imageUploader}
                              source={{uri: this.state.img}}
                              resizeMode="contain"
                        />)
                }
            </TouchableHighlight>
        )
    }
}

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