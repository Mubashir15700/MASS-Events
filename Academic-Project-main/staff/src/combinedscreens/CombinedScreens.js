import { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useLogin } from '../context/authProvider';
import { getCurrStaff } from '../services/api';
import Events from "../screens/Events";
import EventReport from "../screens/EventReport";
import Payments from "../screens/Payments";
import Attendance from "../screens/Attendance";
import Login from '../screens/Login';

const Tab = createBottomTabNavigator();

const CombinedScreen = () => {

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
                    } else if (route.name === 'Events Report') {
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
            <Tab.Screen name="Events Report" component={EventReport} />
            <Tab.Screen name="Payments" component={Payments} />
            
            {(currentstaff && currentstaff.category !== "Boy") && 
                <Tab.Screen name="Attendance" component={Attendance} />
            }
            
        </Tab.Navigator>
    );
}

const CombinedScreens = () => {
    const {auth} = useLogin();
    return auth ? <CombinedScreen /> : <Login />;
}

export default CombinedScreens;