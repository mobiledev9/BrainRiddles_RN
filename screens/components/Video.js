import React from 'react';
import { View, StyleSheet } from 'react-native';
import VideoPlayer from 'react-native-video-controls';

const URL = 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4'

const Video = () => {

    return (
        <View style={styles.backgroundVideo}>
            <VideoPlayer
                source={{uri:URL}}
            />
        </View>
    )   
}

var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
});
export default Video;