import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';

const keywordData = ['수강', '2', '1', '2', '1', '2', '1', '2'];

const NotificationKeywordScreen = () => {
  const [keywords, setKeywords] = useState('');
  // const [keywordData, setKeywordData] = useState([]);
  const subscribeTopic = () => {
    console.log(keywords + '구독');
    return messaging().subscribeToTopic(keywords);
  };

  const renderItem = ({item, idx}) => {
    // const onRemove = () => {
    //   setKeywords(keywordData.filter((item, index) => index != String(idx)));
    // };
    return (
      <View style={styles.listContainer}>
        <Text style={styles.keyword}>{item}</Text>
        <TouchableOpacity>
          <Ionicons
            name="close-outline"
            size={40}
            color="black"
            // onPress={onRemove}
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
        현재 학교 공지사항 알림만 지원하고 있습니다.
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
            marginBottom: 15,
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 23}}>
            알림 받을 키워드{' '}
          </Text>
          <Text style={{fontSize: 20}}>{keywordData.length}/10</Text>
        </View>
        <FlatList
          data={keywordData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
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
    padding: 5,
    borderRadius: 7,
    marginHorizontal: 15,
    borderColor: '#aaaaaa',
    marginVertical: 25,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#aaaaaa',
    marginHorizontal: 10,
  },
  keywordContainer: {
    marginHorizontal: 15,
    flex: 1,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  keyword: {
    fontSize: 20,
    marginLeft: 10,
  },
});

export default NotificationKeywordScreen;
