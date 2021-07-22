import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppStack from './AppStack';

const Providers = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default Providers;
