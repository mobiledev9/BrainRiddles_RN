// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     getFcmToken();
//   }
// }

// const getFcmToken = async () => {
//   let fcmToken = await AsyncStorage.getItem('fcmToken');
//   console.log('Old FcmToken:', fcmToken);
//   if (!fcmToken) {
//     try {
//       const fcmToken = await messaging().getToken();
//       console.log('New FcmToken:', fcmToken);
//       if (fcmToken) {
//         await AsyncStorage.setItem('fcmToken', fcmToken);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

// export const notificationListener = () => {
//   messaging().onNotificationOpenedApp((remoteMessage) => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//   });

//   messaging().onMessage(async (remoteMessage) => {
//     console.log('recieved in foreground state', remoteMessage);
//   });

//   messaging()
//     .getInitialNotification()
//     .then((remoteMessage) => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//       }
//     });
// };

export const localNotification = () => {
  // PushNotification.localNotificationSchedule({
  //   message: 'My Notification Message',
  //   date: new Date(Date.now() + 60 * 100),
  //   allowWhileIdle: false,
  //   repeatType: 'time',
  //   repeatTime: 6000,
  //   soundName: 'default',
  // });

  PushNotification.localNotificationSchedule({
    message: 'My Notification Message',
    date: new Date(Date.now() + 6 * 1000),
    allowWhileIdle: false,
    repeatTime: 6000,
  });
};
