import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const MenuNotificationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>식단표 알림 설정 화면</Text>
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

export default MenuNotificationScreen;
