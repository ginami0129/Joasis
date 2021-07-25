import React from 'react';
import {WebView} from 'react-native-webview';

const NoticeDetailScreen = ({route}) => (
  <WebView source={{uri: route.params.uri}} />
);

export default NoticeDetailScreen;
