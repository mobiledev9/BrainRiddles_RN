import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Categories = ({navigation}) => {
  const category = [
    {
      id: 1,
      tableName: 'Animal',
      name: 'Animal\nRiddles',
      source: require('../asset/Animal.jpg'),
    },
    {
      id: 2,
      tableName: 'Funny',
      name: 'Funny\nRiddles',
      source: require('../asset/funny.jpg'),
    },
    {
      id: 3,
      tableName: 'Tricky',
      name: 'Tricky\nRiddles',
      source: require('../asset/tricky.jpg'),
    },
    {
      id: 4,
      tableName: 'Best',
      name: 'Best\nRiddles',
      source: require('../asset/best.jpg'),
    },
    {
      id: 5,
      tableName: 'Good',
      name: 'Good\nRiddles',
      source: require('../asset/good.jpg'),
    },
    {
      id: 6,
      tableName: 'Rhyming',
      name: 'Rhyming\nRiddles',
      source: require('../asset/rhyming.jpg'),
    },
    {
      id: 7,
      tableName: 'Cool',
      name: 'Cool\nRiddles',
      source: require('../asset/cool.jpg'),
    },
    {
      id: 8,
      tableName: 'Kids',
      name: 'Riddles\nFor\nKids',
      source: require('../asset/kids.jpg'),
    },
    {
      id: 9,
      tableName: 'Food',
      name: 'Food\nRiddles',
      source: require('../asset/food.jpg'),
    },
    {
      id: 10,
      tableName: 'Logic',
      name: 'Logic\nRiddles',
      source: require('../asset/logic.jpg'),
    },
    {
      id: 11,
      tableName: 'Teens',
      name: 'Riddles\nFor\nTeens',

      source: require('../asset/teens.jpg'),
    },
    {
      id: 12,
      tableName: 'what_am_i',
      name: 'What\nAm I?',
      source: require('../asset/whatami.jpg'),
    },
    {
      id: 13,
      tableName: 'what_is_it',
      name: 'What\nIs It?',
      source: require('../asset/whatisi.jpg'),
    },
    {
      id: 14,
      tableName: 'who_am_i',
      name: 'Who\nAm I?',
      source: require('../asset/whoami.jpg'),
    },
  ];

  const CategoryItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.categoryItemContainer}
        onPress={() => {
          navigation.navigate('SingleCategory', {
            tableName: item.tableName,
          });
        }}>
        <Text
          style={{
            color: '#fff',
            fontFamily: 'PalanquinDark-Regular',
            fontSize: hp(3),
            textAlign: 'center',
            lineHeight: hp(4),
          }}>
          {item.name}
        </Text>
        {/* <Image
          source={item.source}
          style={{height: 70, width: 330, borderRadius: 10}}
        /> */}
      </TouchableOpacity>
    );
  };

  const Header = () => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(3),
        paddingTop: hp(5),
        paddingBottom: hp(2),
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
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
          fontFamily: 'PalanquinDark-Regular',
          fontSize: hp(4),
          textShadowColor: 'black',
          textShadowRadius: 1,
          textShadowOffset: {
            width: 2,
            height: 2,
          },
        }}>
        Categories
      </Text>
      <View
        style={{
          height: hp(4),
          width: hp(4),
        }}></View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={styles.mainContainer}
        source={require('../asset/images/bg.png')}>
        <Header />
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          data={category}
          numColumns={2}
          contentContainerStyle={{margin: 1, alignSelf: 'center'}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <CategoryItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </ImageBackground>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: '#e9e6f2',
  },
  categoryItemContainer: {
    borderRadius: 10,
    margin: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(20),
    width: hp(20),
    backgroundColor: '#5A9BE6',
    paddingHorizontal: wp(2),
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  categoryItemText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
