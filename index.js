/**
 * @format
 */
import {AppRegistry} from 'react-native';
import CronJob from 'react-native-cron-job';
import PushNotification from 'react-native-push-notification';
import App from './App';
import {name as appName} from './app.json';

const riddles = [
  {
    quation: `He's small but he can climb a tower.`,
    answer: 'ant',
  },
  {
    quation: `It has plenty of backbone but doesn't have a let. It peels like an orange but it comes from an egg.`,
    answer: 'snake',
  },
  {
    quation: `You use a knife to slice my head and weep beside me when I am dead. What am I?`,
    answer: 'onion',
  },
  {
    quation: `The more you have of me, the less you see. Who am I?`,
    answer: 'darkness',
  },
  {
    quation: `Tomorrow's yesterday. Yesterday's tomorrow. What is it?`,
    answer: 'today',
  },
  {
    quation: `A mile from end to end, yet as close to as a friend. A precious commodity, freely given. Seen on the dead and on the living. Found on the rich, poor, short and tall, but shared among children most of all. What is it?`,
    answer: 'smile',
  },

  {
    quation: `I have a mouth on my head and eat everything. What am I?`,
    answer: 'backpack',
  },
  {
    quation: `I travel the world and I am drunk constantly. Who am I?.`,
    answer: 'water',
  },
  {
    quation: `Who always enjoys poor health?`,
    answer: 'water',
  },
  {
    quation: `This is the main ingredient in spaghetti and Mac-N-Cheese`,
    answer: 'pasta',
  },
];

const scheduleNotification = () => {
  PushNotification.createChannel(
    {
      channelId: 'riddles', //'riddles-group',
      channelName: 'riddles', //'riddles-group',
      channelDescription: 'A channel to categorise your notifications',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`),
  );

  const day = new Date().getDay();
  PushNotification.localNotification({
    title: riddles[day].quation,
    message: `Answer made of ${riddles[day].answer.length} letters`,
    subText: riddles[day].answer,
    channelId: 'riddles',
  });
};

const CronJobTask = async () => {
  scheduleNotification();
  CronJob.completeTask();
};

AppRegistry.registerHeadlessTask('CRONJOB', () => CronJobTask);
AppRegistry.registerComponent(appName, () => App);
