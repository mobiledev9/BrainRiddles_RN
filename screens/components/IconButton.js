import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const IconButton = ({ iconName, size, backgroundColor, buttonText, coins }) => {

    return (
        <TouchableOpacity>
            <View>
                <CoinIcon name= {iconName} size= {size}/>
                <Text>{buttonText}</Text>
                <CoinIcon name= {iconName} size= {size}/>
                <Text>{coins}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create ({
    mainContainer:{
        flexDirection='row'
        
    },

    popButtonStyle:{
        backgroundColor: '#3CB371',
        borderRadius: 18,
        margin: 5
      },
})

export default IconButton;