import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable, RefreshControl, ScrollView, Alert } from 'react-native';
import DateIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Fontisto';
import { getEvents, markAttendance } from "../services/api";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default Attendance = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllEvents();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    let response = await getEvents();
    setEvents(response.data);
    setLoading(false);
  }

  const handleAttendance = async (event, staff) => {
    let response = await markAttendance({ event, staff });
    Alert.alert(response.data.message);
    getAllEvents();
  }

  return (
    <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      {loading ? <Text>Loading...</Text> 
      :
      events.length ?
        events.map((event, index) => {
          return (
            <View key={index} style={styles.row}>
              <View style={{ backgroundColor: 'pink', width: '100%', borderTopStartRadius: 10, alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ marginHorizontal: 10, padding: 10 }}>
                  <DateIcon name={'calendar-clock-outline'} size={20} color={'black'} />
                  <Text>{event.date}</Text>
                  <Text>{event.time}</Text>
                </View>
                <View>
                  <Text style={{ fontWeight: 'bold' }}>{event.eventname}</Text>
                </View>
              </View>
                {event.bookings.length ? 
                  event.bookings.map((booking, index) => {
                    return (
                      <View key={index} style={{ alignItems: 'center', flexDirection: 'row',  padding: 10 }}>
                        <View>
                          <Icon name={'male'} size={20} color={'black'} />
                        </View>
                        <View style={{ marginLeft: 10, width: '70%' }}>
                          <Text>{booking.username}</Text>
                          <Text><Icon name={'phone'} size={12} color={'black'} /> {booking.phone}</Text>
                        </View>
                        <View>
                          {event.attendance.some((staff) => staff.username === booking.username) ? 
                          <Pressable style={styles.actionBtn} onPress={() => handleAttendance(event.eventname, booking.username)}>
                            <Icon name={'checkbox-active'} size={20} color={'pink'} />
                          </Pressable> :
                          <Pressable style={styles.actionBtn} onPress={() => handleAttendance(event.eventname, booking.username)}>
                            <Icon name={'checkbox-passive'} size={20} color={'gray'} />
                          </Pressable>}
                        </View>
                      </View>
                    );
                  }) :
                  <View style={{ padding: 10 }}>
                    <Text>No bookings yet</Text>
                  </View>
                }
              </View>
            );
          })
          :
          <Text>No data found</Text>
        }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
  row: {
    width: '90%',
    elevation: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 20,
    paddingHorizontal: 0,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionBtn: {
    width: 30,
    paddingHorizontal: 3,
    justifyContent: 'center',
  },
});