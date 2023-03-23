import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

const PopModelView = ({
  title,
  messege,
  onOkay,
  okayButtonText,
  isModelVisible,
}) => {
  return (
    <Modal
      isVisible={isModelVisible}
      animationIn="shake"
      animationOut="zoomOut">
      <View style={styles.popView}>
        <Text style={styles.titleStyle}> {title} </Text>
        <Text style={styles.messegeStyle}> {messege} </Text>
        <TouchableOpacity style={styles.okayButton} onPress={() => onOkay()}>
          <Text style={styles.okayButtonTextStyle}> {okayButtonText} </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popView: {
    paddingBottom: 10,
    marginHorizontal: 40,
    backgroundColor: '#3b5998',
    borderRadius: 10,
  },

  titleStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    marginTop: 10,
  },

  messegeStyle: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
    marginTop: 10,
    marginHorizontal: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },

  okayButton: {
    marginTop: 30,
    marginHorizontal: 70,
    height: 40,
    backgroundColor: '#3CB371',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  okayButtonTextStyle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PopModelView;
