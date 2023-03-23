import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CloseIcon from 'react-native-vector-icons/FontAwesome';

const NotificationModal = ({
  isVisible,
  title,
  data,
  letters,
  onClose,
  onSelect,
  answer,
  riddleAnswer,
}) => {
  const [disabled, setDisabled] = useState([]);
  const [success, setSuccess] = useState(false);
  const onEndEditing = () => {
    console.log(answer.toString().replace(/,/g, ''), riddleAnswer);
    if (answer.toString().replace(/,/g, '') == riddleAnswer) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (success) {
      setSuccess(!success);
    }
  }, [success]);
  return (
    <Modal isVisible={isVisible}>
      {success ? (
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          style={styles.successModal}>
          <Animatable.Image
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            source={require('../../asset/images/done.png')}
            style={{height: hp(20), width: hp(20)}}
          />
        </Animatable.View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              alignSelf: 'flex-end',
              marginBottom: hp(2),
            }}>
            <CloseIcon name="remove" size={25} style={{color: '#6EC9BB'}} />
          </TouchableOpacity>
          <View style={styles.titleView}>
            <Text style={styles.title}>{title}</Text>
          </View>

          <FlatList
            data={data}
            numColumns={7}
            contentContainerStyle={{
              margin: 1,
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: hp(4),
            }}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => (
              <TextInput
                style={{
                  ...styles.render,
                  backgroundColor: success ? '#6EC9BB' : '#FE5F7C',
                }}
                editable={false}
                value={answer ? answer[index] : ''}
                onEndEditing={onEndEditing()}
              />
            )}
          />
          <FlatList
            data={letters}
            keyExtractor={(index) => index.toString()}
            scrollEnabled={false}
            numColumns={6}
            style={{marginTop: hp(1)}}
            contentContainerStyle={{
              margin: 1,
              alignSelf: 'center',
              alignItems: 'center',
            }}
            renderItem={({item, index}) => (
              <TouchableOpacity
                disabled={disabled.includes(index)}
                style={{
                  ...styles.letters,
                  backgroundColor: disabled.includes(index)
                    ? '#5A5A5A'
                    : '#95C6FE',
                }}
                onPress={() => {
                  onSelect(item);
                  setDisabled([...disabled, index]);
                }}>
                <Text
                  style={{
                    ...styles.title,
                    textTransform: 'uppercase',
                    lineHeight: hp(4),
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(60),
    width: wp(90),
    alignItems: 'center',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 5,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  title: {
    color: '#fff',
    fontFamily: 'PalanquinDark-Medium',
    textAlign: 'center',
    fontSize: hp(2.3),
    lineHeight: hp(3),
  },
  titleView: {
    backgroundColor: '#6EC9BB',
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
    borderRadius: 20,
  },
  render: {
    margin: 5,
    fontSize: hp(2.5),
    fontFamily: 'PalanquinDark-Regular',
    textTransform: 'uppercase',
    color: '#fff',
    height: hp(5.5),
    width: hp(5.5),
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    padding: 5,
  },
  letters: {
    margin: wp(1.2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 2,
    shadowOpacity: 1.0,
    height: wp(10),
    width: wp(10),
  },
  successModal: {
    height: hp(30),
    width: hp(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 5,
  },
});

export default NotificationModal;
