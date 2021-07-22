import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import MenuNotificationScreen from '../screens/MenuNotificationScreen';
import NotificationKeywordScreen from '../screens/NotificationKeywordScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const NotificationTopTab = () => (
  <TopTab.Navigator
    tabBarOptions={{
      activeTintColor: '#56286E',
      labelStyle: {fontSize: 16, fontWeight: 'bold'},
      indicatorStyle: {backgroundColor: '#56286E'},
    }}>
    <TopTab.Screen name="공지사항" component={NotificationKeywordScreen} />
    <TopTab.Screen name="식단표" component={MenuNotificationScreen} />
  </TopTab.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="공지사항" component={HomeScreen} />
  </Stack.Navigator>
);

const MenuStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="식단표" component={MenuScreen} />
  </Stack.Navigator>
);

const NotificationStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="키워드 설정" component={NotificationTopTab} />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="설정" component={SettingsScreen} />
  </Stack.Navigator>
);

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Menu') {
            iconName = 'restaurant';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#56286E',
        showLabel: false,
      }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Menu" component={MenuStack} />
      <Tab.Screen name="Notifications" component={NotificationStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppStack;
