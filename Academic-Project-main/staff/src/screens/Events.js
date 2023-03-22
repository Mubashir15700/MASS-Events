import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable, RefreshControl, ScrollView, Alert } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getNewEvents, getCurrStaff, bookEvent } from "../services/api";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default Events = () => {

  const [events, setEvents] = useState([]);
  const [currentstaff, setCurrentStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllNewEvents();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getAllNewEvents();
    getCurrentStaff();
  }, []);

  const getAllNewEvents = async () => {
    let response = await getNewEvents();
    response && setEvents(response.data);
    setLoading(false);
  }

  const getCurrentStaff = async () => {
    let response = await getCurrStaff();
    response && setCurrentStaff(response.data.currentStaff);
  }

  const bookThisEvent = async (event, date) => {
    let response = await bookEvent({ event, date });
    if (response) {
      Alert.alert(response.data.message);
      getAllNewEvents();
    }
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
      </View> : events.length ?
      <View>
        <Text style={{ textAlign: 'center' }}>New Event(s)</Text>
        {events.map((event) => {
          return (
            <View key={event._id} style={[styles.row, { borderWidth: 1, borderColor: '#36828b' }]}>
              <View>
                <Icon name={'calendar-clock-outline'} size={20} color={'#36828b'} />
                <Text>{event.date}</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{event.time}</Text>
                <Text style={{ fontSize: 10 }}>Duration: {event.duration}(hrs)</Text>
              </View>
              <View style={{
                marginLeft: 15,
                paddingVertical: 20,
                flex: 1,
                }}
              >
                <Text style={{ fontSize: 13, color: 'grey' }}>{event.eventname}</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{event.location}</Text>
                <Text style={{ fontSize: 13, fontWeight: 'bold', marginTop: 3 }}>
                  Avail Slots: {event.reqstaffs - event.bookings.length}
                </Text>
              </View>
              {event.bookings.some((staff) => staff === currentstaff._id) ?
                <Pressable style={[styles.actionBtn, { borderWidth: 1, borderColor: 'gray', }]}
                  onPress={() => {
                    Alert.alert("Already booked this event")
                  }}
                >
                  <Icon name={'bell-check'} size={23} color={'#36828b'} />
                </Pressable> : (event.reqstaffs <= event.bookings.length) ?
                <Pressable style={[styles.actionBtn, { borderWidth: 1, borderColor: 'gray', }]}
                  onPress={() => {
                    Alert.alert("Booking full")
                  }}
                >
                  <Icon name={'bell-alert-outline'} size={23} color={'gray'} />
                </Pressable> :
                <Pressable style={[styles.actionBtn, { borderWidth: 1, borderColor: 'gray', }]}
                  onPress={() =>
                    bookThisEvent(event._id, event.date)
                  }
                >
                  <Icon name={'bell-plus-outline'} size={23} color={'#36828b'} />
                </Pressable>
              }
            </View>
          );
        })}
      </View> :
      <View style={{ paddingTop: 270, alignItems: 'center' }}>
        <Text>No new events found</Text>
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
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 50,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});