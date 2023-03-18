import { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useLogin } from '../context/authProvider';
import { getCurrStaff } from '../services/api';
import Events from "../screens/Events";
import Status from "../screens/Status";
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
                        iconName = 'calendar-minus';
                    } else if (route.name === 'Status') {
                        iconName = 'tasks';
                    } else if (route.name === 'Payments') {
                        iconName = 'credit-card';
                    } else if (route.name === 'Attendance') {
                        iconName = 'user-check';
                    }
                    return <Icon name={iconName} size={20} color={color} />;
                },
                tabBarActiveTintColor: '#36828b',
                tabBarInactiveTintColor: 'gray',
            })
            }
        >
            <Tab.Screen name="Events" component={Events} />

            {(currentstaff && currentstaff.category !== "Boy") && 
                <Tab.Screen name="Attendance" component={Attendance} />
            }

            <Tab.Screen name="Status" component={Status} />
            <Tab.Screen name="Payments" component={Payments} />
        </Tab.Navigator>
    );
}

const CombinedScreens = () => {
    const {auth} = useLogin();
    return auth ? <CombinedScreen /> : <Login />;
}

export default CombinedScreens;