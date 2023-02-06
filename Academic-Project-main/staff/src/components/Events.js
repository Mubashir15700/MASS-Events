import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable, RefreshControl, ScrollView, Alert } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getEvents, getCurrStaff, bookEvent } from "../services/api";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default Events = () => {

  const [events, setEvents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllEvents();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getAllEvents();
    getCurrentStaff();
  }, []);

  const getAllEvents = async () => {
    let response = await getEvents();
    response && setEvents(response.data);
    setLoading(false);
  }

  const getCurrentStaff = async () => {
    let response = await getCurrStaff();
    response && setStaff(response.data.currentStaff);
  }

  const bookThisEvent = async (event) => {
    let response = await bookEvent({ event });
    if (response.data.status == "success") {
      Alert.alert(response.data.message);
      getAllEvents();
    }
  }

  return (
    <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      {loading ? 
        <Text>Loading...</Text> 
      :
      events.length ?
        events.map((event, index) => {
          return (
            <View key={index} style={styles.row}>
              <View>
                <Icon name={'calendar-clock-outline'} size={20} color={'pink'} />
                <Text>{event.date}</Text>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{event.time}</Text>
              </View>
              <View style={{
                marginLeft: 10,
                paddingVertical: 20,
                flex: 1,
              }}>
                <Text style={{ fontSize: 13, color: 'grey' }}>{event.eventname}</Text>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{event.location}</Text>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Avail Slots: {event.reqstaffs - event.bookings.length}</Text>
              </View>
              {event.bookings.some((staff) => staff.username === staff.username) || (event.reqstaffs < event.bookings.length) ?
                <Pressable style={styles.disabledActionBtn} disabled={true}>
                  <Text>Book</Text>
                </Pressable>
                :
                <Pressable style={styles.actionBtn} onPress={() => bookThisEvent(event.eventname)}>
                  <Text>Book</Text>
                </Pressable> 
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
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: 'pink',
    borderRadius: 30,
    paddingHorizontal: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabledActionBtn: {
    width: 80,
    height: 30,
    backgroundColor: 'grey',
    borderRadius: 30,
    paddingHorizontal: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});