import React, { useState } from 'react';
import { Button, Text, View , StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-navigation';
import Modal from 'react-native-modal';

function ModalTester() {
    const [isModalVisible, setModelVisible] = useState(false);

    const toggleModal = () => {
        setModelVisible(!isModalVisible);
    }

    return (
        <View style={{ flex: 1}}>
            <Button title='show modal' onPress= {toggleModal}/>
                <Modal isVisible= {isModalVisible}>
                    <View style={{ flex: 1}}>
                        <Text>Hello</Text>
                        <Button title= 'hide modal' onPress= {toggleModal}/>
                    </View>
                </Modal>
        </View> 
    );
}

const styles = StyleSheet.create({
    touchableViewStyle: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 1.0,
        height: 50,
        width: 30,
      },
    
})

export default ModalTester;