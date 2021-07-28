import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import {data} from '../assets/calenderData';

const CalendarScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Timeline
        data={data}
        lineColor="#56286E"
        circleColor="#56286E"
        showTime={false}
        innerCircle={'dot'}
        listViewContainerStyle={{
          paddingTop: 10,
          paddingBottom: 5,
          paddingRight: 15,
        }}
        detailContainerStyle={{
          borderWidth: 1,
          borderColor: '#56286E',
          marginBottom: 7,
          paddingHorizontal: 15,
          shadowColor: '#bbbbbb',
          borderRadius: 10,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default CalendarScreen;
