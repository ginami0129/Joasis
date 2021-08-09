import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const NotificationKeywordScreen = () => {
  const [keywords, setKeywords] = useState('');
  const subscribeTopic = () => {
    console.log(keywords + '구독');
    return messaging().subscribeToTopic(keywords);
  };

  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        value={keywords}
        onChangeText={text => setKeywords(text)}
      />
      <Button title="제출" onPress={subscribeTopic} />
      <Text>공지사항 키워드 설정화면</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default NotificationKeywordScreen;
