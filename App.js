import React, {useEffect, useState, useRef} from 'react';
import {Platform, SafeAreaView, StatusBar, View, AppState} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FlashMessage from 'react-native-flash-message';
import PushNotification from 'react-native-push-notification';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import CronJob from 'react-native-cron-job';
import SplashScreen from './screens/SplashScreen';
import Categories from './screens/Categories';
import SingleCategory from './screens/SingleCategory';
import Video from './screens/components/Video';
import RateUs from './screens/RateUs';
import NotificationModal from './screens/components/NotificationModal';

const Stack = createStackNavigator();

const App = () => {
  const [notification, setNotification] = useState({});
  const [isVisible, setVisible] = useState(false);
  const [letters, setletters] = useState([]);
  const [answer, setAnswer] = useState([]);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }
      appState.curactiverent = nextAppState;
      console.log('AppState', appState.current);
      if (appState.current == 'active') {
        SystemNavigationBar.navigationHide();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    SystemNavigationBar.navigationHide();
    notificationListener();
    if (Platform.OS == 'android') {
      CronJob.startCronJob(8, 0);
      CronJob.startCronJob(20, 0);
    }
  }, []);

  useEffect(() => {
    randomCharacter(notification.subText);
  }, [notification]);

  const notificationListener = () => {
    PushNotification.configure({
      onRegister: function (token) {},
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        setNotification(notification);
        setVisible(true);
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  };

  const randomCharacter = (text) => {
    var keypad = [];
    const answer = `${text}`;
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
    console.log(finalKeypad);
    setletters(finalKeypad);
  };

  return (
    <View style={{flex: 1}}>
      {Platform.OS == 'android' ? (
        <SafeAreaView style={{flex: 1}}>
          <StatusBar
            translucent
            backgroundColor={Platform.OS == 'ios' ? 'red' : 'transparent'}
            barStyle="dark-content"
          />
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="RateUs" component={RateUs} />
              <Stack.Screen
                name="CATEGORIES"
                component={Categories}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SingleCategory"
                component={SingleCategory}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="Video" component={Video} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="RateUs" component={RateUs} />
            <Stack.Screen
              name="CATEGORIES"
              component={Categories}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SingleCategory"
              component={SingleCategory}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Video" component={Video} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
      <FlashMessage position="center" />
      <NotificationModal
        isVisible={isVisible}
        title={notification.title}
        data={notification.subText}
        letters={letters}
        onClose={() => setVisible(false)}
        onSelect={(item) => setAnswer([...answer, item])}
        riddleAnswer={notification.subText}
        answer={answer}
      />
    </View>
  );
};

export default App;
