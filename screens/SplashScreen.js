import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Linking,
  SafeAreaView,
} from 'react-native';
import {LogBox} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Share from 'react-native-share';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();
  }, []);

  const ShareApp = async () => {
    const shareOptions = {
      title: 'Share file',
      failOnCancel: false,
      urls: [
        'https://play.google.com/store/apps/details?id=ru.cherkasov.riddles',
      ],
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log('Result =>', ShareResponse);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  const Button = ({
    shadowColor,
    btnColor,
    title,
    fontSize,
    onPress,
    leftIcon,
    width,
  }) => (
    <TouchableOpacity
      style={{
        ...styles.btnContainer,
        backgroundColor: shadowColor,
        width: width,
      }}>
      <TouchableOpacity
        style={{...styles.btn, backgroundColor: btnColor, width: width}}
        onPress={onPress}>
        <Image source={leftIcon} style={styles.icon} />
        <Text style={{...styles.text, fontSize: fontSize}}>{title}</Text>
        <View style={styles.icon}></View>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../asset/images/bg.png')}
      style={styles.container}>
      <View style={{marginBottom: hp(4)}}>
        <Text style={{...styles.text, ...styles.textStroke, fontSize: hp(6)}}>
          Brain
        </Text>
        <Text style={{...styles.text, ...styles.textStroke, fontSize: hp(8)}}>
          Riddles
        </Text>
      </View>
      <Button
        onPress={() => navigation.navigate('CATEGORIES')}
        leftIcon={require('../asset/images/play.png')}
        shadowColor="#5BCBBA"
        btnColor="#5BCBBA"
        title="Play"
        fontSize={hp(3)}
        width={wp(80)}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: wp(80),
        }}>
        <Button
          onPress={() =>
            Linking.openURL(
              'https://play.google.com/store/apps/details?id=ru.cherkasov.riddles',
            )
          }
          leftIcon={require('../asset/images/like.png')}
          shadowColor="#3887E1"
          btnColor="#5A9BE6"
          title="Rate Us"
          fontSize={hp(3)}
          width={wp(38)}
        />
        <Button
          onPress={() => ShareApp()}
          leftIcon={require('../asset/images/sharing.png')}
          shadowColor="#3887E1"
          btnColor="#5A9BE6"
          title="Share"
          fontSize={hp(3)}
          width={wp(38)}
        />
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontFamily: 'Oliverqueen-Regular',
    textAlign: 'center',
    marginLeft: wp(2),
  },
  textStroke: {
    textShadowColor: 'black',
    textShadowRadius: 2,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
  },
  btn: {
    height: hp(7),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    borderRadius: 30,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  btnContainer: {
    height: hp(8),
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: hp(2),
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    elevation: 5,
  },
  icon: {
    height: hp(5),
    width: hp(5),
    tintColor: '#fff',
  },
});
