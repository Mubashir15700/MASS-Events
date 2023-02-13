import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable, RefreshControl, ScrollView, Alert } from 'react-native';
import DateIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Fontisto';
import { getEvents, getCurrStaff } from "../services/api";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default EventReport = () => {

  const [events, setEvents] = useState([]);
  const [currentStaff, setCurrentStaff] = useState([]);
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
    response && setCurrentStaff(response.data.currentStaff);
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
        <View style={styles.row}>
          <Text>Loading...</Text>
        </View>
      :
      events.length ?
        events.map((event) => {
          return (
            event.payments.map((evt) => {
              return (
                (evt.username === currentStaff.username) &&
                  <View key={evt._id}>
                    <View style={styles.row}>
                      <View style={{ backgroundColor: 'pink', width: '100%', borderTopStartRadius: 10, alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ marginHorizontal: 10, padding: 10 }}>
                          <DateIcon name={'calendar-outline'} size={20} color={'black'} />
                          <Text>{event.date}</Text>
                        </View>
                        <View>
                          <Text>{event.eventname}</Text>
                        </View>
                      </View>
                      <View style={{ padding: 10 }}>
                        <Text style={{fontWeight: 'bold'}}>{evt.username}</Text>
                        <Text>Recieved: {evt.wage}</Text> 
                      </View>
                  </View>
                </View>
              );
            })
          );
        })
      :
      <View style={styles.row}>
        <Text>No data found</Text>
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