import { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getCurrStaff } from '../services/api';
import Events from "../components/Events";
import EventReport from "../components/EventReport";
import Payments from "../components/Payments";
import Attendance from "../components/Attendance";

const Tab = createBottomTabNavigator();

export default Combined = () => {

    const [currentstaff, setCurrentStaff] = useState([]);

    useEffect(() => {
        getCurrentStaff();
    }, [])

    const getCurrentStaff = async () => {
        let response = await getCurrStaff();
        response && setCurrentStaff(response.data.currentStaff);
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    if (route.name === 'Events') {
                        iconName = focused ? 'calendar-check' : 'calendar-minus';
                    } else if (route.name === 'EventReport') {
                        iconName = focused ? 'tasks' : 'tasks';
                    } else if (route.name === 'Payments') {
                        iconName = focused ? 'credit-card' : 'credit-card';
                    } else if (route.name === 'Attendance') {
                        iconName = focused ? 'user-check' : 'user-check';
                    }
                    return <Icon name={iconName} size={20} color={color} />;
                },
                tabBarActiveTintColor: 'pink',
                tabBarInactiveTintColor: 'gray',
            })
            }
        >
            <Tab.Screen name="Events" component={Events} />
            <Tab.Screen name="EventReport" component={EventReport} />
            <Tab.Screen name="Payments" component={Payments} />
            
            {(currentstaff && currentstaff.category !== "boy") && 
                <Tab.Screen name="Attendance" component={Attendance} />
            }
            
        </Tab.Navigator>
    );
}