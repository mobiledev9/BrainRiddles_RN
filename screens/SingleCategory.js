import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Platform,
  TextInput,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CloseIcon from 'react-native-vector-icons/FontAwesome';
import {openDatabase} from 'react-native-sqlite-storage';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {AdMobRewarded, AdMobInterstitial} from 'react-native-admob';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import {showMessage} from 'react-native-flash-message';
import Share from 'react-native-share';
import InAppReview from 'react-native-in-app-review';
import PopModelView from './components/PopModelView';
const appUrl =
  'https://play.google.com/store/apps/details?id=ru.cherkasov.riddles';
var db = openDatabase({
  name: 'Riddles.db',
  createFromLocation: 1,
});

const SingleCategory = ({navigation, route}) => {
  const {tableName} = route.params;
  const [text, setText] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLevelcomplete, setLevelComplete] = useState(false);
  const [counter, setCounter] = useState(0);
  const [revealCounter, setRevealCounter] = useState(0);
  const [RevealLetter, setRevealLetter] = useState([]);
  const [isRewardVisible, setRewardVisible] = useState(false);
  const [coins, setCoins] = useState(100);
  const [textans, setTextAns] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [storeModal, setStoreModal] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [hide, setHide] = useState([]);
  const [riddle, setRiddle] = useState({});
  const [isWinCoins, setWinCoins] = useState(false);
  const [removed, setRemoved] = useState([]);
  const revel = RevealLetter.concat(text);
  const revelStr = revel.toString().replace(/,/g, '');
  const {getItem, setItem} = useAsyncStorage('in_App_Review');
  var keypad = [];

  //----------------------USE EFFECT--------------------------
  useEffect(() => {
    inAppReview();
    getRiddleData();
  }, [counter]);

  useEffect(() => {
    randomCharacter();
  }, [riddle.answer, counter]);

  useEffect(() => {
    async function countCoins() {
      const finalCoins = await AsyncStorage.getItem('COINS');
      finalCoins && setCoins(Number(finalCoins));
    }
    countCoins();
  }, []);

  useEffect(() => {
    const addClose = AdMobInterstitial.addEventListener('adClosed', () => {
      SystemNavigationBar.navigationHide();
      if (!isWinCoins) {
        // addCoins();
        // setRateModal(true);
      } else {
        setRewardVisible(true);
      }
    });

    return () => {
      addClose.remove();
    };
  }, [isWinCoins]);

  const videoAds = () => {
    setVisible(false);
    // AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917');
    // AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());
    AdMobInterstitial.setAdUnitID(
      Platform.OS == 'android'
        ? 'ca-app-pub-8530290074189410/3336133838'
        : 'ca-app-pub-2293121401505613/3133502592',
    );
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  };

  const randomCharacter = () => {
    const answer = `${riddle.answer}`;
    const separatedComma = Array.from(answer).toString().replace(/,/g, '');

    keypad = separatedComma.split('');
    var totalRandom = 14 - keypad.length;
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < totalRandom; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const newKeypad = result.split('');
    const finalKeypad = keypad.concat(newKeypad).sort();
    setTextAns(finalKeypad);
  };

  //----------------GET CURRENT RIDDLE INDEX---------------------
  const getIndex = async () => {
    if (isLevelcomplete === true) {
      getRiddleData();
      RevealLetter.length = 0;
      setText('');
      setHide('');
      setLevelComplete(false);
      addCoins();
    }
  };

  //---------------REVEAL INDEX------------------------
  const revealIndex = async () => {
    if (coins >= 50) {
      const answer = `${riddle && riddle.answer}`;
      const separatedComma = Array.from(answer).toString().replace(/,/g, '');
      setRevealCounter(revealCounter + 1);
      setText([...text, separatedComma[revealCounter]]);
      textans.map((item, index) => {
        if (item == separatedComma[revealCounter]) {
          setHide([...hide, index]);
        }
      });
      updateCoins(50);
      setVisible(false);
    } else {
      showMessage({
        message: "You don't have enough coins",
        type: 'info',
      });
    }
  };

  //----------------REMOVE LAST LETTER---------------------
  const removeLast = () => {
    const i = text.length - 1;
    if (text[i] == '' || !hide) {
      if (text[i - 1] == '' || !hide[i - 1]) {
        if (text[i - 2] == '' || !hide[i - 2]) {
          text.splice(i);
          text.splice(i - 1);
          text.splice(i - 2);
          text.splice(i - 3);
          hide.splice(i);
          hide.splice(i - 1);
          hide.splice(i - 2);
          hide.splice(i - 3);
          setText([...text]);
          setHide([...hide]);
        } else {
          text.splice(i);
          text.splice(i - 1);
          text.splice(i - 2);
          hide.splice(i);
          hide.splice(i - 1);
          hide.splice(i - 2);
          setText([...text]);
          setHide([...hide]);
        }
      } else {
        text.splice(i);
        text.splice(i - 1);
        hide.splice(i);
        hide.splice(i - 1);
        setText([...text]);
        setHide([...hide]);
      }
    } else {
      text.splice(-1);
      hide.splice(-1);
      setText([...text]);
      setHide([...hide]);
    }

    // let arr = text.splice(-1);
    // setText(text.filter((item) => item !== arr));
    // hide.pop();
    // setHide(hide);
  };

  //-------------------------------------
  const toggleModal = () => {
    if (coins == 100) {
      showMessage({
        message: "You don't have enough coins",
        type: 'info',
      });
    } else {
      // setVisible(false);
      setModalVisible(!isModalVisible);
    }
  };

  //--------------------RIDDLES DATA----------------------
  const getRiddleData = async () => {
    var data = [];
    await db.transaction((tx) => {
      tx.executeSql('SELECT * FROM ' + tableName, [], (tx, results) => {
        var len = results.rows.length;
        for (var i = 0; i < len; i++) {
          data = [...data, results.rows.item(i)];
        }
        const completed = data.filter((item) => item.level == 'complete');
        const id = completed.length;
        setCounter(id);
        setRiddle({
          level: data[id].id,
          riddle: data[id].riddle,
          answer: data[id].answer,
        });
        console.log(data[id]);
      });
    });
  };

  //----------------ADD LEVEL IN DATABASE---------------------
  const addCoins = async () => {
    const coinJson = await AsyncStorage.getItem('COINS');
    if (!coinJson) {
      await AsyncStorage.setItem('COINS', (coins + 50).toString());
    } else {
      const coin = Number(coinJson);
      await AsyncStorage.setItem('COINS', (coin + 50).toString());
    }
    const finalCoins = await AsyncStorage.getItem('COINS');
    setCoins(Number(finalCoins));
  };

  const addLevel = async () => {
    try {
      await db.transaction((tx) => {
        tx.executeSql(
          `UPDATE ${tableName} set level=? where id=?`,
          ['complete', riddle && riddle.level],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log('updated');
            } else console.log('Updation Failed');
          },
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  const updateCoins = async (coin) => {
    await AsyncStorage.setItem('COINS', (coins - coin).toString());
    const finalCoins = await AsyncStorage.getItem('COINS');
    setCoins(Number(finalCoins));
  };

  //--------------------ANSWER VIEW----------------
  const onEndEditing = async () => {
    if (riddle.answer.toUpperCase() == revelStr.toUpperCase()) {
      setLevelComplete(true);
      showMessage({
        message: 'Level Completed',
        type: 'success',
      });
      setTimeout(() => {
        videoAds();
        setWinCoins(false);
        setTimeout(() => {
          getIndex();
          addLevel();
        }, 2000);
      }, 2000);
    } else {
      if (
        text.length == riddle.answer.length &&
        !text.includes('') &&
        riddle.answer != revelStr
      ) {
        showMessage({
          message: 'Tap on tile to remove letter',
          type: 'danger',
        });
      } else {
      }
      setLevelComplete(false);
    }
  };

  const Button = ({icon, tittle, onPress, disabled, coin, coins}) => (
    <TouchableOpacity
      disabled={disabled}
      style={{
        ...styles.ButtonView,
        backgroundColor: disabled ? '#228B22' : '#3CB371',
      }}
      onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={icon} style={{height: hp(3), width: hp(3)}} />
        <Text style={styles.ButtonText}>{tittle}</Text>
      </View>
      {(coin || coins) && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={coin} style={{height: hp(2.5), width: hp(2.5)}} />
          <Text style={styles.ButtonText}>{coins}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const Header = ({level, coins}) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(3),
        marginTop: hp(5),
        marginBottom: hp(10),
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{width: wp(20), paddingVertical: hp(2)}}>
        <Image
          source={require('../asset/images/back.png')}
          style={{
            height: hp(4),
            width: hp(4),
            tintColor: '#fff',
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: '#fff',
          fontFamily: 'PalanquinDark-Medium',
          fontSize: hp(4),
          textShadowColor: 'black',
          textShadowRadius: 1,
          textShadowOffset: {
            width: 2,
            height: 2,
          },
        }}>
        Level {level}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#2D6AB0',
          borderRadius: 25,
          width: wp(22),
          height: hp(5.8),
        }}>
        <TouchableOpacity
          onPress={() => setStoreModal(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#5A9BE6',
            width: wp(22),
            borderRadius: 20,
            height: hp(5),
            shadowColor: '#000',
            shadowOffset: {width: 5, height: 5},
            shadowOpacity: 1,
            elevation: 5,
          }}>
          <Image
            source={require('../asset/images/coins.png')}
            style={{height: hp(3), width: hp(3)}}
          />
          <Text
            style={{
              color: '#fff',
              fontFamily: 'PalanquinDark-Medium',
              fontSize: hp(2),
              paddingLeft: wp(3),
            }}>
            {coins}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );

  const RiddleView = () => (
    <View style={{flex: 1}}>
      <View
        style={{
          width: wp(90),
          backgroundColor: '#6EC9BB',
          alignSelf: 'center',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: wp(5),
          paddingVertical: hp(2),
          marginBottom: hp(5),
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 5,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'PalanquinDark-Medium',
              fontSize: hp(2.9),
              textAlign: 'center',
              lineHeight: hp(4),
            }}>
            {riddle && riddle.riddle}
          </Text>
        </ScrollView>
      </View>
    </View>
  );

  const renderItem1 = ({item, index}) => {
    return Platform.OS == 'android' ? (
      <TouchableOpacity
        disabled={!text[index]}
        onPress={() => {
          text.splice(index, 1, '');
          hide.splice(index, 1, null);
          setText([...text]);
          setHide([...hide]);
          setRemoved([...removed, index]);
        }}>
        <TextInput
          maxLength={1}
          editable={false}
          style={{
            ...styles.answerText,
            backgroundColor:
              riddle.answer.toUpperCase() == revelStr.toUpperCase()
                ? '#3CB371'
                : riddle.answer.length == revelStr.length &&
                  riddle.answer.toUpperCase() != revelStr.toUpperCase()
                ? '#FE5F7C'
                : '#6EC9BB',
          }}
          autoCapitalize="characters"
          value={text ? text[index] : ''}
          onEndEditing={onEndEditing()}
        />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        disabled={!text[index]}
        onPress={() => {
          text.splice(index, 1, '');
          hide.splice(index, 1, null);
          setText([...text]);
          setHide([...hide]);
          setRemoved([...removed, index]);
        }}
        style={{
          ...styles.answerBox,
          backgroundColor:
            riddle.answer.toUpperCase() == revelStr.toUpperCase()
              ? '#3CB371'
              : riddle.answer.length == revelStr.length &&
                riddle.answer.toUpperCase() != revelStr.toUpperCase()
              ? '#FE5F7C'
              : '#6EC9BB',
        }}>
        <TextInput
          maxLength={1}
          editable={false}
          autoCapitalize="characters"
          style={styles.answerText1}
          value={text ? text[index] : ''}
          onEndEditing={onEndEditing()}
        />
      </TouchableOpacity>
    );
  };

  const ShareApp = async (option) => {
    const msg = `${riddle.riddle} \nAnswer made of ${
      riddle.answer.length
    } letters. \n${textans.toString()} \nMany thanks :) `;
    const shareSMS = {
      title: '',
      social: Share.Social.SMS,
      recipient: '+91',
      message: msg,
      url: `\n${appUrl}`,
    };

    const shareWhatsApp = {
      message: msg,
      url: `\n${appUrl}`,
      social: Share.Social.WHATSAPP,
    };

    const shareEmail = {
      message: msg,
      email: 'email@example.com',
      social: Share.Social.EMAIL,
      failOnCancel: false,
      url: `\n${appUrl}`,
    };
    try {
      const ShareResponse = await Share.shareSingle(
        option == 'sms'
          ? shareSMS
          : option == 'whatsapp'
          ? shareWhatsApp
          : shareEmail,
      );
      console.log('Result =>', ShareResponse);
      setHelpModal(false);
      setVisible(false);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  const inAppReview = async () => {
    const lastDateAppReviewed = await getItem();

    if (lastDateAppReviewed !== null) {
      let Today = new Date();
      const leftTime = Math.abs(Today - Date.parse(lastDateAppReviewed));
      let leftDays = Math.ceil(leftTime / (1000 * 60 * 60 * 24));

      if (leftDays > 15) {
        await setItem(new Date().toString());
        InAppReview.RequestInAppReview();
      }
    } else {
      await setItem(new Date().toString());
      InAppReview.RequestInAppReview();
    }
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={styles.mainContainer}
        source={require('../asset/images/bg.png')}>
        <Header level={riddle && riddle.level} coins={coins} />
        <RiddleView />
        <View style={styles.flatview}>
          <FlatList
            numColumns={7}
            contentContainerStyle={{
              margin: 1,
              alignItems: 'center',
              alignSelf: 'center',
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            extraData={text}
            data={riddle && riddle.answer}
            renderItem={renderItem1}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <FlatList
            keyExtractor={(index) => index.toString()}
            scrollEnabled={false}
            numColumns={7}
            style={{marginTop: hp(1)}}
            contentContainerStyle={{margin: 1, alignSelf: 'center'}}
            data={textans}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  disabled={hide.includes(index)}
                  style={{
                    ...styles.touchableViewStyle,
                    backgroundColor: hide.includes(index)
                      ? '#5A5A5A'
                      : '#95C6FE',
                  }}
                  onPress={() => {
                    if (
                      text.length == riddle.answer.length &&
                      !text.includes('')
                    ) {
                    } else {
                      if (removed.length > 0) {
                        text.splice(
                          removed[removed.length - 1],
                          1,
                          item.toUpperCase(),
                        );
                        hide.splice(removed[removed.length - 1], 1, index);
                        setText([...text]);
                        setHide([...hide]);
                        removed.splice(removed.length - 1, 1);
                        setRemoved([...removed]);
                      } else {
                        setText([...text, item.toUpperCase()]);
                        setHide([...hide, index]);
                      }
                    }
                  }}>
                  <Text style={styles.bottomContTextStyle}> {item} </Text>
                </TouchableOpacity>
              );
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.touchableButtonStyle}
              onPress={() => setVisible(true)}>
              <Image
                source={require('../asset/images/hint.png')}
                style={{height: hp(4), width: hp(4), tintColor: '#fff'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={text.length == 0}
              style={styles.touchableButtonStyle}
              onPress={() => removeLast()}>
              <Image
                source={require('../asset/images/brush.png')}
                style={{height: hp(4), width: hp(4), tintColor: '#fff'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <Modal
        isVisible={storeModal}
        animationIn="wobble"
        animationOut="slideOutDown">
        <View
          style={{
            backgroundColor: '#3b5998',
            width: wp(70),
            paddingBottom: hp(2),
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setStoreModal(false)}
            style={{
              alignSelf: 'flex-end',
              marginTop: hp(1),
              marginRight: hp(1),
            }}>
            <CloseIcon name="remove" size={20} style={styles.closeIconStyle} />
          </TouchableOpacity>
          <Text style={styles.headingStyle}>Store</Text>
          <Button
            icon={require('../asset/youtube.png')}
            tittle="Receive 50 Coins"
            onPress={() => {
              setStoreModal(false);
              setWinCoins(true);
              videoAds();
            }}
          />
          <Button
            icon={require('../asset/coin.png')}
            tittle="500 Coins"
            coins="₹15.00"
          />
          <Button
            icon={require('../asset/coin.png')}
            tittle="2500 Coins"
            coins="₹65.00"
          />
          <Button
            icon={require('../asset/coin.png')}
            tittle="5000 Coins"
            coins="₹130.00"
          />
          <Button
            icon={require('../asset/coin.png')}
            tittle="25000 Coins"
            coins="₹650.00"
          />
          <Button
            icon={require('../asset/coin.png')}
            tittle="500000 Coins"
            coins="₹1300.00"
          />
        </View>
      </Modal>

      <Modal
        isVisible={isVisible}
        animationIn="wobble"
        animationOut="slideOutDown">
        <View
          style={{
            backgroundColor: '#3b5998',
            width: wp(70),
            paddingBottom: hp(2),
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              alignSelf: 'flex-end',
              marginTop: hp(1),
              marginRight: hp(1),
            }}>
            <CloseIcon name="remove" size={20} style={styles.closeIconStyle} />
          </TouchableOpacity>
          <Text style={styles.headingStyle}>Boosts</Text>
          <Button
            icon={require('../asset/help.png')}
            tittle="Ask Friends for Help"
            onPress={() => setHelpModal(true)}
          />
          <Button
            disabled={coins >= 50 ? false : true}
            icon={require('../asset/world.png')}
            tittle="Reveal Letter"
            coin={require('../asset/coin.png')}
            coins="50"
            onPress={() => revealIndex()}
          />
          <Button
            disabled={coins >= 80 ? false : true}
            onPress={() => {
              if (coins >= 80) {
                let ans = riddle.answer.split('');
                const data = [];
                textans.filter((text, index) => {
                  if (!ans.includes(text)) {
                    data.push(index);
                  }
                });
                const removeLetter = data.slice(0, 4);
                setHide(removeLetter);
                updateCoins(80);
                setVisible(false);
              } else {
                showMessage({
                  message: "You don't have enough coins",
                  type: 'info',
                });
              }
            }}
            icon={require('../asset/delete.png')}
            tittle="Remove Letters"
            coin={require('../asset/coin.png')}
            coins="80"
          />
          <Button
            disabled={coins >= 200 ? false : true}
            icon={require('../asset/idea.png')}
            tittle="Show Hint"
            coin={require('../asset/coin.png')}
            coins="200"
            onPress={() => toggleModal()}
          />
          <Button
            icon={require('../asset/youtube.png')}
            tittle="Receive 50 Coins"
            onPress={() => {
              setVisible(false);
              setWinCoins(true);
              videoAds();
            }}
          />
        </View>
        <Modal
          isVisible={helpModal}
          animationIn="wobble"
          animationOut="slideOutDown">
          <View
            style={{
              backgroundColor: '#3b5998',
              width: wp(70),
              paddingBottom: hp(2),
              borderRadius: 10,
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setHelpModal(false)}
              style={{
                alignSelf: 'flex-end',
                marginTop: hp(1),
                marginRight: hp(1),
              }}>
              <CloseIcon
                name="remove"
                size={20}
                style={styles.closeIconStyle}
              />
            </TouchableOpacity>
            <Text style={styles.headingStyle}>Ask Friends for Help</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: wp(6),
                marginVertical: hp(3),
              }}>
              <TouchableOpacity onPress={() => ShareApp('whatsapp')}>
                <Image
                  source={require('../asset/images/whatsapp.png')}
                  style={{height: hp(7), width: hp(7)}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => ShareApp('sms')}>
                <Image
                  source={require('../asset/sms.png')}
                  style={{height: hp(7), width: hp(7)}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => ShareApp('email')}>
                <Image
                  source={require('../asset/mail.png')}
                  style={{height: hp(7), width: hp(7)}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <PopModelView
          isModelVisible={isModalVisible}
          title="Hint"
          messege={riddle && riddle.answer}
          okayButtonText="Okay"
          onOkay={async () => {
            updateCoins(200);
            setModalVisible(!isModalVisible);
          }}
        />
      </Modal>

      <Modal isVisible={successModal} animationIn="slideInUp">
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          style={{
            backgroundColor: '#fff',
            height: hp(30),
            width: wp(80),
            alignSelf: 'center',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Animatable.Text
            animation="pulse"
            iterationCount="infinite"
            style={{fontFamily: 'PalanquinDark-Medium', fontSize: hp(3)}}>
            Level Completed
          </Animatable.Text>
          <Animatable.Image
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            source={require('../asset/images/gift-box.png')}
            style={{height: hp(15), width: hp(15)}}
          />
        </Animatable.View>
        <TouchableOpacity
          onPress={() => {
            addCoins();
            setSuccessModal(false);
            videoAds();
            setWinCoins(false);
          }}>
          <Text
            style={{
              fontFamily: 'PalanquinDark-Medium',
              fontSize: hp(3),
              color: '#fff',
              alignSelf: 'center',
            }}>
            Tap to close
          </Text>
        </TouchableOpacity>
      </Modal>

      <PopModelView
        isModelVisible={isRewardVisible}
        title="Reward"
        messege="You succesfully topped up your balance and received 50 coins."
        okayButtonText="Okay"
        onOkay={async () => {
          await AsyncStorage.setItem('COINS', (coins + 50).toString());
          let coin = await AsyncStorage.getItem('COINS');
          setCoins(Number(coin));
          setRewardVisible(false);
          setWinCoins(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    //flex: 1,
    height: '100%',
    backgroundColor: '#e9e6f2',
  },
  buttonsContainer: {
    width: wp(100),
    height: hp(25),
    paddingHorizontal: wp(4),
    alignItems: 'center',
  },
  touchableViewStyle: {
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
  bottomContTextStyle: {
    textTransform: 'uppercase',
    fontSize: hp(2.5),
    color: 'black',
    textAlign: 'center',
    fontFamily: 'PalanquinDark-Medium',
  },
  flatview: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  answerBox: {
    margin: 5,
    height: Platform.OS == 'android' ? hp(6) : hp(5.5),
    width: Platform.OS == 'android' ? hp(6) : hp(5.5),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerText1: {
    fontSize: Platform.OS == 'android' ? hp(2.5) : hp(3),
    fontFamily: 'PalanquinDark-Regular',
    textTransform: 'uppercase',
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  answerText: {
    fontSize: Platform.OS == 'android' ? hp(2.5) : hp(3),
    fontFamily: 'PalanquinDark-Regular',
    textTransform: 'uppercase',
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',

    margin: 5,
    padding: 5,
    height: hp(5.5),
    width: hp(5.5),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingStyle: {
    fontSize: hp(3),
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'PalanquinDark-Medium',
  },
  ButtonText: {
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'flex-start',
    marginLeft: 5,
    fontFamily: 'PalanquinDark-Medium',
  },
  touchableButtonStyle: {
    backgroundColor: '#5A9BE6',
    marginHorizontal: 10,
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
    height: hp(5.5),
    width: hp(5.5),
    marginBottom: hp(2),
  },

  ////////////////////////
  // Top Header Style
  topHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 35 : 10,
    backgroundColor: '#e9e6f2',
  },

  backButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('25%'),
    height: hp('7%'),
    backgroundColor: '#008B8B', //#3CB371
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },

  backText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  coinContainer: {
    width: wp('25%'),
    height: hp('7%'),
    flexDirection: 'row',
    backgroundColor: '#008B8B',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  coinText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },

  // Riddle Style
  riddleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#e9e6f2',
    padding: 20,
  },

  riddleText: {
    fontSize: 16,
    textAlign: 'center',
  },

  // TextInput
  textInput: {
    borderWidth: 2,
    borderColor: '#ccc',
    margin: 20,
    borderRadius: 10,
  },

  // Bottom Button Style

  answerContainer: {
    alignItems: 'center',
    backgroundColor: 'lightgray', //'#a4a5b4',
    padding: 10,
  },

  latterStyle: {
    color: '#000',
    backgroundColor: 'lightgray',
  },

  selectedText: {
    backgroundColor: '#778899',
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 2,
    shadowOpacity: 1.0,
    height: 50,
    width: 30,
  },

  AnswerView: {
    backgroundColor: 'white',
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
    margin: 5,
    shadowOpacity: 1.0,
    height: hp(6),
    width: hp(6),
  },

  AnswerFillView: {
    margin: hp(0.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
    shadowOpacity: 1.0,
    height: hp(6),
    width: hp(6),
  },

  BlankSpace: {
    backgroundColor: 'blue',
  },

  bottomContTextStyle1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },

  textStyle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: 50,
  },

  answerContainerView: {
    backgroundColor: '#e9e6f2',
    bottom: 40,
    alignItems: 'center',
  },
  trashButton: {
    backgroundColor: '#3CB371',
    marginHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1.0,
    height: 50,
    width: 30,
  },
  touchableTextStyle: {
    backgroundColor: 'darkgray',
    marginHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1.0,
    height: 50,
    width: 30,
  },

  scoreViewStyle: {
    height: 70,
    width: 70,
    backgroundColor: '#008B8B',
    borderRadius: 25,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainScoreViewstyle: {
    height: 60,
    width: 60,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scoreTextStyle: {
    fontSize: 30,
    color: '#fff',
  },

  closeIconStyle: {
    color: '#fff',
  },

  mainPopContainer: {
    justifyContent: 'flex-start',
    backgroundColor: '#3b5998',
    width: 250,
  },

  popButtonStyle: {
    backgroundColor: '#3CB371',
    borderRadius: 18,
    margin: 5,
  },

  PopButtonPressed: {
    backgroundColor: '#228B22',
    borderRadius: 18,
    margin: 5,
  },

  RewardStyle: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
    marginTop: 10,
    marginHorizontal: 20,
    textAlign: 'center',
  },

  ButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 18,
    width: wp(60),
    alignSelf: 'center',
    margin: hp(1),
    padding: hp(1.2),
  },

  TouchableButton: {
    flexDirection: 'row',
    backgroundColor: '#228B22',
    borderRadius: 18,
    margin: 5,
    justifyContent: 'space-between',
    padding: 8,
  },

  coinTextStyle: {
    color: '#fff',
  },

  coinView: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginLeft: 70,
  },

  coinView1: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginLeft: 50,
  },

  item: {
    // backgroundColor: '#f9c2ff',
    padding: 2,
    //width:10,
    //marginVertical: 8,
    borderRadius: 10,
    //marginHorizontal: 10,
    marginBottom: 30,
  },
});

export default SingleCategory;
