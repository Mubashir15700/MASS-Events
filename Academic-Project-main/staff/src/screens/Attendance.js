import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable, RefreshControl, ScrollView, Alert } from 'react-native';
import DateIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Fontisto';
import { getBookings, markAttendance, cancelAttendance } from "../services/api";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default Attendance = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getTodayBookings();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getTodayBookings();
  }, []);

  const getTodayBookings = async () => {
    let response = await getBookings();
    if(response) {
      setEvents(response.data);
    }
    setLoading(false);
  }

  const markStaffAttendance = async (event, staff) => {
    let response = await markAttendance({ event, staff });
    response && Alert.alert(response.data.message);
    getTodayBookings();
  }

  const cancelStaffAttendance = async (event, staff) => {
    let response = await cancelAttendance({ event, staff });
    response && Alert.alert(response.data.message);
    getTodayBookings();
  }

  return (
    <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
    {loading ?
      <View style={styles.row}>
        <Text>Loading...</Text>
      </View> :
      events.length ?
        <View style={{alignItems: 'center', borderTopRadius: 10}}>
          <Text>Today's Event(s)</Text>
          {events.map((event) => {
            return (
              <View key={event._id} style={[styles.row, { borderWidth: 1, borderColor: '#36828b' }]}>
                <View style={styles.innerRow}>
                  <View style={{ marginHorizontal: 10, padding: 10 }}>
                    <DateIcon name={'calendar-clock-outline'} size={20} color={'black'} />
                    <Text style={{ fontWeight: 'bold' }}>{event.date}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{event.time}</Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: 'bold' }}>{event.eventname}</Text>
                  </View>
                </View>
                {event.bookings.length === 0 && 
                  <View style={{ padding: 10 }}>
                    <Text>No bookings yet</Text>
                  </View>
                }
                {event.bookings.map((booking) => {
                  return (
                    <View key={booking._id} style={{ alignItems: 'center', flexDirection: 'row', padding: 10 }}>
                      <View>
                        <Icon name={'male'} size={20} color={'black'} />
                      </View>
                      <View style={{ marginLeft: 10, width: '70%' }}>
                        <Text>{booking.username}</Text>
                        <Text><Icon name={'phone'} size={12} color={'black'} /> {booking.phone}</Text>
                      </View>
                      <View>
                        {event.attendance.some((staffs) => staffs === booking._id) ?
                          <Pressable style={styles.actionBtn} onPress={() => 
                            cancelStaffAttendance(event._id, booking._id)}
                          >
                            <Icon name={'checkbox-active'} size={20} color={'#36828b'} />
                          </Pressable> :
                          <Pressable style={styles.actionBtn} onPress={() => 
                            markStaffAttendance(event._id, booking._id)}
                          >
                            <Icon name={'checkbox-passive'} size={20} color={'gray'} />
                          </Pressable>
                        }
                      </View>
                    </View>
                  );
                })
              }
            </View>
          );
        })}
      </View> :
      <View style={{ paddingTop: 270, alignItems: 'center' }}>
        <Text>No events today</Text>
      </View>
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
    borderRadius: 12,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 20,
    paddingHorizontal: 0,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  innerRow: { 
    backgroundColor: '#36828b', 
    width: '100%', 
    alignItems: 'center', 
    flexDirection: 'row', 
    borderTopStartRadius: 10, 
    borderTopEndRadius: 10 
  },
  actionBtn: {
    width: 30,
    paddingHorizontal: 3,
    justifyContent: 'center',
  },
});