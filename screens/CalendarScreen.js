import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const CalendarScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>학사 일정 화면</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CalendarScreen;
