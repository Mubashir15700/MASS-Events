import { useState, useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DrawerIcon from "react-native-vector-icons/MaterialCommunityIcons";
import PhoneIcon from 'react-native-vector-icons/Fontisto';
import { useLogin } from '../context/authProvider';
import { getCurrStaff, logoutStaff } from '../services/api';
import { View, Text, Animated, TouchableOpacity, Alert } from 'react-native';
import Events from "../screens/Events";
import Status from "../screens/Status";
import Payments from "../screens/Payments";
import Attendance from "../screens/Attendance";
import Login from '../screens/Login';

const Tab = createBottomTabNavigator();

const CombinedScreen = () => {

    const [currentstaff, setCurrentStaff] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    const { setAuth } = useLogin();

    const moveToRight = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        getCurrentStaff();
    }, [])

    const getCurrentStaff = async () => {
        let response = await getCurrStaff();
        response && setCurrentStaff(response.data.currentStaff);
    }

    const logout = async () => {
        let response = await logoutStaff();
        if (response && response.data.status === "success") {
            Alert.alert(response.data.message); 
            setAuth(false); 
        } else {
            Alert.alert(response.data.status);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'lightgray' }}>
            <View style={{ marginTop: 80, marginLeft: 25 }}>
                <DrawerIcon name={'account-circle'} size={70} color={"#36828b"} />
                <View style={{ marginTop: 10, marginLeft: 8 }}>
                    <Text>{currentstaff.username}</Text>
                    <Text>
                        <PhoneIcon name={'phone'} size={12} color={'black'} />
                        {"  " + currentstaff.phone}
                    </Text>
                </View>
            </View>
            <View style={{ marginTop: 400, marginLeft: 25 }}>
                <TouchableOpacity
                    style={{ 
                        width: 100,
                        borderRadius: 5,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#4682b4", 
                    }}
                    onPress = {() => logout()}
                >
                    <Text style={{ color: '#fff' }}>
                        <DrawerIcon name={'logout'} size={30} />
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
            <Animated.View style={{ flex: 1, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, transform: 
                [{scale: scale}, {translateX: moveToRight}]
            }}>
                <Animated.View style={{
                    width: '100%', 
                    backgroundColor: '#36828b', 
                    flexDirection: 'row', 
                    paddingLeft: 15, 
                    paddingTop: 50, 
                    paddingBottom: 10,
                    borderTopLeftRadius: 20,
                }}>
                    <TouchableOpacity onPress={() => {
                        Animated.timing(scale, {
                            toValue: showMenu ? 1 : 0.8,
                            duration: 300,
                            useNativeDriver: true,
                        }).start();
                        Animated.timing(moveToRight, {
                            toValue: showMenu ? 0 : 230,
                            duration: 300,
                            useNativeDriver: true,
                        }).start();
                        setShowMenu(!showMenu);
                    }}>
                        {showMenu ? 
                            <DrawerIcon name={'close'} size={30} color={'#e5e5e5'} /> : 
                            <DrawerIcon name={'menu'} size={30} color={'#e5e5e5'} /> 
                        }
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 80, fontSize: 18, color: '#e5e5e5' }}>MASS Events</Text>
                </Animated.View>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color }) => {
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
                    })}
                >
                    <Tab.Screen name="Events" component={Events} />

                    {(currentstaff && currentstaff.category !== "Boy") &&
                        <Tab.Screen name="Attendance" component={Attendance} />
                    }

                    <Tab.Screen name="Status" component={Status} />
                    <Tab.Screen name="Payments" component={Payments} />
                </Tab.Navigator>
            </Animated.View>
        </View>
    );
}

const CombinedScreens = () => {
    const { auth } = useLogin();
    return auth ? <CombinedScreen /> : <Login />;
}

export default CombinedScreens;