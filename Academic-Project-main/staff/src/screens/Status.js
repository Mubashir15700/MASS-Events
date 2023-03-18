import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, RefreshControl, ScrollView } from 'react-native';
import DateIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Fontisto';
import { getBookedEvents } from "../services/api";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default Status = () => {

  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllBookedEvents();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getAllBookedEvents();
  }, []);

  const getAllBookedEvents = async () => {
    let response = await getBookedEvents();
    if (response) {
      setEvents(response.data.events);
      setCurrentUser(response.data.user);
      setLoading(false);
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
        <View style={styles.row}>
          <Text>Loading...</Text>
        </View>
        :
        events.length ?
          <View>
            <Text style={{ textAlign: 'center' }}>All Booked Event's Status</Text>
            {events.map((event) => {
              return (
                event.bookings.map((evt) => {
                  return (
                    <View key={evt._id}>
                      {evt.username === currentUser &&
                        <View style={[styles.row, { borderWidth: 1, borderColor: '#36828b' }]}>
                          <View style={styles.innerRow}>
                            <View style={{ marginHorizontal: 10, padding: 10 }}>
                              <DateIcon name={'calendar-outline'} size={20} color={'black'} />
                              <Text style={{ fontWeight: 'bold' }}>{event.date}</Text>
                              <Text style={{ fontWeight: 'bold', fontSize: 10 }}>Status: Done</Text>
                            </View>
                            <View>
                              <Text style={{ fontWeight: 'bold' }}>{event.eventname}</Text>
                            </View>
                          </View>
                          <View style={{ padding: 10 }}>
                            {event.attendance.some((staff) => staff.username === currentUser) ?
                              <View style={{ flexDirection: 'row' }}>
                                <Text>Attended:</Text>
                                <Icon name={'checkbox-active'} size={15} color={'#36828b'} style={{ marginLeft: 100, }} />
                              </View> :
                              <View style={{ flexDirection: 'row' }}>
                                <Text>Attended:</Text>
                                <Icon name={'checkbox-passive'} size={15} color={'gray'} style={{ marginLeft: 100, }} />
                              </View>
                            }
                            {event.payments.some((staff) => staff.username === currentUser) ?
                              <View style={{ flexDirection: 'row' }}>
                                <Text>Wage Recieved:</Text>
                                <Icon name={'checkbox-active'} size={15} color={'#36828b'} style={{ marginLeft: 60, }} />
                              </View>
                              :
                              <View style={{ flexDirection: 'row' }}>
                                <Text>Wage Recieved:</Text>
                                <Icon name={'checkbox-passive'} size={15} color={'gray'} style={{ marginLeft: 61, }} />
                              </View>
                            }
                          </View>
                        </View>
                      }
                    </View>
                  );
                })
              );
            })
            }
          </View>
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
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  actionBtn: {
    width: 30,
    paddingHorizontal: 3,
    justifyContent: 'center',
  },
});