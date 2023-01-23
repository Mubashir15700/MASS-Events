import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from "./src/components/Login";
import Combined from './src/screens/CombinedScreens';

export default App = () => {

  const [auth, setAuth] = useState(true);

  return (
    <>
      {
        auth ?
          <NavigationContainer>
            <Combined />
          </NavigationContainer>
        :
          <Login />
      }
    </>
  );
}