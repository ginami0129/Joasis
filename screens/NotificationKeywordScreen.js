import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const NotificationKeywordScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
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
});

export default NotificationKeywordScreen;
