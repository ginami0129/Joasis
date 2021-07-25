import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import NotificationScreen from '../screens/NotificationScreen';
import MenuScreen from '../screens/MenuScreen';
import MenuNotificationScreen from '../screens/MenuNotificationScreen';
import NotificationKeywordScreen from '../screens/NotificationKeywordScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NoticeDetailScreen from '../screens/NoticeDetailScreen';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);

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
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name="공지사항"
      component={NotificationScreen}
      initialParams={{catagory: ''}}
    />
    <Stack.Screen
      name="세부사항"
      component={NoticeDetailScreen}
      options={{
        title: '',
        headerBackImage: () => (
          <Ionicons name="close-outline" size={30} color="black" />
        ),
      }}
    />
  </Stack.Navigator>
);

const MenuStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="식단표" component={MenuScreen} />
  </Stack.Navigator>
);

const NotificationStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="키워드 설정" component={NotificationTopTab} />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator screenOptions={screenOptions}>
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

const screenOptions = {
  headerStyle: {
    shadowColor: 'black',
    // shadowOpacity: 0.26,
    // shadowRadius: 10,
    elevation: 5,
    // backgroundColor: 'white',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center',
};

export default AppStack;
