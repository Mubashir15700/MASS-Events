import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './src/screens/Login';
import Sites from './src/screens/Sites';
import SiteReport from './src/screens/SiteReport';
import Payments from './src/screens/Payments';
import Attendance from './src/screens/Attendance';

const Tab = createBottomTabNavigator();

export default function App() {

  const [auth, setAuth] = useState(false);

  // const handleClick = () => {
  //   console.log("clicked");
  //   setAuth(true);
  // }

  return (
    <>
      {
        auth ?
          (<NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'Sites') {
                    iconName = focused ? 'map-marker' : 'map-marker';
                  } else if (route.name === 'Site Report') {
                    iconName = focused ? 'tasks' : 'tasks';
                  } else if (route.name === 'Payments') {
                    iconName = focused ? 'credit-card-alt' : 'credit-card';
                  } else if (route.name === 'Attendance') {
                    iconName = focused ? 'list' : 'list-alt';
                  }
                  return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'pink',
                tabBarInactiveTintColor: 'gray',
              })}
            >
              <Tab.Screen name="Sites" component={Sites} />
              <Tab.Screen name="Site Report" component={SiteReport} />
              <Tab.Screen name="Payments" component={Payments} />
              <Tab.Screen name="Attendance" component={Attendance} />
            </Tab.Navigator>
          </NavigationContainer>)
          :
          <Login />
      }
    </>
  );
}
