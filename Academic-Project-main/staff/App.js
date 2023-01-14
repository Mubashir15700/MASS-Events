import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './src/components/screens/Login';
import Events from './src/components/screens/Events';
import EventReport from './src/components/screens/EventReport';
import Payments from './src/components/screens/Payments';
import Attendance from './src/components/screens/Attendance';

const Tab = createBottomTabNavigator();

export default App = () => {

  const [auth, setAuth] = useState(true);

  return (
    <>
      {
        auth ?
          (
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Events') {
                      iconName = focused ? 'map-marker' : 'map-marker';
                    } else if (route.name === 'EventReport') {
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
                })
                }
              >
                <Tab.Screen name="Events" component={Events} />
                <Tab.Screen name="EventReport" component={EventReport} />
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