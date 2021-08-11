import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';

const NotificationKeywordScreen = () => {
  if (loading == true) return;
  const [keywords, setKeywords] = useState('');
  const [keywordData, setKeywordData] = useState([]);
  const [loading, setLoading] = useState(false);
  const subscribeTopic = () => {
    if (keywordData.length == 10) {
      Alert.alert('경고', '등록 가능한 키워드 수를 초과하였습니다.');
      return;
    }
    if (keywords == '') {
      Alert.alert('경고', '키워드를 입력해 주세요.');
      return;
    }
    setLoading(true);
    Keyboard.dismiss();
    setKeywordData(keywordData.concat(keywords));
    setKeywords('');

    let obj = {};
    let value = undefined;

    database()
      .ref('/keywords/')
      .once('value')
      .then(snapshot => {
        value =
          snapshot.val()[keywords] == undefined ? 0 : snapshot.val()[keywords];
        obj[keywords] = value + 1;
        database()
          .ref('/keywords/')
          .update(obj)
          .then(() => setLoading(false));
      });
    // return messaging().subscribeToTopic(keywords);
  };

  const renderItem = ({item, index}) => {
    const onRemove = () => {
      if (loading == true) return;
      setLoading(true);
      let obj = {};
      database()
        .ref('/keywords/')
        .once('value')
        .then(snapshot => {
          obj[item] = snapshot.val()[item] - 1;
          database()
            .ref('/keywords/')
            .update(obj)
            .then(() => {
              setKeywordData(
                keywordData.filter((item, idx) => String(idx) != String(index)),
              );
              setLoading(false);
            });
        });
    };

    return (
      <View style={styles.listContainer}>
        <Text style={styles.keyword}>{item}</Text>
        <TouchableOpacity>
          <Ionicons
            name="close-outline"
            size={40}
            color="black"
            onPress={onRemove}
          />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{marginHorizontal: 15, marginTop: 20, color: '#aaaaaa'}}>
        현재 교내 공지사항 알림만 지원하고 있습니다.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={keywords}
          onChangeText={text => setKeywords(text)}
          placeholder="알림 받을 키워드를 입력하세요."
        />
        <TouchableOpacity onPress={subscribeTopic}>
          <Text style={styles.buttonTitle}>등록</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.keywordContainer}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 5,
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            알림 받을 키워드{' '}
          </Text>
          <Text style={{fontSize: 16}}>{keywordData.length}/10</Text>
        </View>
        <FlatList
          data={keywordData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
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
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 3,
    borderRadius: 7,
    marginHorizontal: 15,
    borderColor: '#aaaaaa',
    marginVertical: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#56286E',
    marginHorizontal: 10,
  },
  keywordContainer: {
    marginHorizontal: 15,
    flex: 1,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  keyword: {
    fontSize: 16,
    marginLeft: 10,
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

export default NotificationKeywordScreen;
