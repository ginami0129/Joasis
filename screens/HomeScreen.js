import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import Icon from '../components/SquareNIcon';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>공지사항 화면</Text>
      <Icon name="n_box" size={20} color={'#56286E'} />
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

export default HomeScreen;
