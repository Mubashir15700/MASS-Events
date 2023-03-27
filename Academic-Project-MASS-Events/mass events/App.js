import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CombinedScreens from './src/combinedscreens/CombinedScreens';
import AuthProvider from './src/context/authProvider.js';

export default App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <CombinedScreens />
      </NavigationContainer>
    </AuthProvider>
  );
}