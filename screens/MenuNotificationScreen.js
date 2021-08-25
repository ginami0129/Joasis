import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Switch,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import Inko from 'inko';

const MenuNotificationScreen = () => {
  const [menuName, setmenuName] = useState([
    '기존관',
    '참빛관',
    // '진수당',
    '장학숙',
  ]);
  const [isEnabled, setIsEnabled] = useState([false, false, false, false]);
  const [loading, setLoading] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const renderItem = ({item, index}) => {
    const toggleSwitch = () => {
      setLoading(true);
      let temp = [];
      for (let i = 0; i < 4; i++) {
        if (i == index) {
          temp.push(!isEnabled[i]);
        } else {
          temp.push(isEnabled[i]);
        }
      }
      let obj = {};
      let value = undefined;
      database()
        .ref('/menus/')
        .once('value')
        .then(snapshot => {
          value = snapshot.val()[item] == undefined ? 0 : snapshot.val()[item];
          obj[item] = temp[index] ? value + 1 : value - 1;
          database()
            .ref('/menus/')
            .update(obj)
            .then(() => {
              setLoading(false);
              setIsEnabled(temp);
            });
        });
      let inko = new Inko();
      console.log(inko.ko2en(item));
      if (temp[index]) {
        return messaging().subscribeToTopic(inko.ko2en(item));
      } else {
        return messaging().unsubscribeFromTopic(inko.ko2en(item));
      }
    };
    return (
      <View style={styles.listItemContainer}>
        <Text style={styles.itemName}>{item}</Text>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{false: '#767577', true: '#D0BFB7'}}
            thumbColor={isEnabled[index] ? '#56286E' : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isEnabled[index]}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={menuName}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        ListFooterComponent={
          <Text style={{color: '#aaaaaa', fontSize: 14}}>
            아침은 7시 점심은 11시 저녁은 17시에 알림이 가요. {'\n'}
            등록된 식단 정보가 없는 경우 알림을 보내드리지 않아요.
          </Text>
        }
        ListFooterComponentStyle={{
          marginTop: 10,
          marginHorizontal: 15,
        }}
      />
      {loading && (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="#56286E"
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listItemContainer: {
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    borderBottomColor: '#56286E',
    borderBottomWidth: 0.5,
    marginVertical: 5,
  },
  itemName: {
    fontSize: 16,
  },
  switchContainer: {
    marginRight: 2,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuNotificationScreen;
