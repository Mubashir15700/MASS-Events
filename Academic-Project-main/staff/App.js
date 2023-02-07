import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { checkAuth } from './src/services/api.js';
import Login from "./src/components/Login";
import Combined from './src/screens/CombinedScreens';

export default App = () => {

  const [auth, setAuth] = useState(true);

  useEffect(() => {
    checkUserAuth();
  }, [auth]);

  const checkUserAuth = async () => {
    let response = await checkAuth();
    if(response.data.status === "failed") {
      setAuth(false);
    }
  }

  return (
    <>
      {auth ?
        <NavigationContainer>
          <Combined />
        </NavigationContainer>
        :
        <Login />
      }
    </>
  );
}