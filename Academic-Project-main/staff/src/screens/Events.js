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

  const bookThisEvent = async (event) => {
    let response = await bookEvent({ event });
    if (response) {
      if (response.data.status == "success") {
        Alert.alert(response.data.message);
        getAllNewEvents();
      }
    }
  }

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  const formattedToday = yyyy + '-' + mm + '-' + dd;

  return (
    <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      {loading ? 
        <View style={styles.row}>
          <Text>Loading...</Text> 
        </View>
      :
      events.length ?
        events.map((event) => {
          return (
            <View key={event._id} style={[styles.row, { borderWidth: 1, borderColor: 'pink' }]}>
              <View>
                <Icon name={'calendar-clock-outline'} size={20} color={'pink'} />
                <Text>{event.date}</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{event.time}</Text>
                <Text style={{ fontSize: 10 }}>Duration(hrs): {event.duration}</Text>
              </View>
              <View style={{
                marginLeft: 15,
                paddingVertical: 20,
                flex: 1,
              }}>
                <Text style={{ fontSize: 13, color: 'grey' }}>{event.eventname}</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{event.location}</Text>
                <Text style={{ fontSize: 13, fontWeight: 'bold', marginTop: 3 }}>Avail Slots: {event.reqstaffs - event.bookings.length}</Text>
              </View>
              {event.bookings.some((staff) => staff.username === currentstaff.username) ?
                <Pressable style={[styles.actionBtn, {backgroundColor: 'pink'}]} onPress={() => {Alert.alert("Already booked this event")}}>
                  <Text>Booked</Text>
                </Pressable>
              : (event.reqstaffs <= event.bookings.length) ?
                <Pressable style={[styles.actionBtn, {backgroundColor: '#d3d3d3'}]} onPress={() => {Alert.alert("Booking full")}}>
                  <Text>Full</Text>
                </Pressable> 
              :
                <Pressable style={[styles.actionBtn, { borderWidth: 1, borderColor: 'gray',}]} onPress={() => bookThisEvent(event.eventname)}>
                  <Text>Book</Text>
                </Pressable> 
              }
            </View>
          );
        })
        :
        <View style={[styles.row, { justifyContent: 'center' }]}>
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
    width: 70,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});