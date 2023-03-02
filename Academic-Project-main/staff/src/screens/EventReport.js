import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, RefreshControl, ScrollView } from 'react-native';
import DateIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getPayments } from "../services/api";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default EventReport = () => {

  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllPayments();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getAllPayments();
  }, []);

  const getAllPayments = async () => {
    let response = await getPayments();
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
          events.map((event) => {
            return (
              event.payments.map((evt) => {
                return (
                  <View key={evt._id}>
                    {evt.username === currentUser &&
                      <View style={[styles.row, { borderWidth: 1, borderColor: 'pink' }]}>
                        <>
                          <View style={styles.innerRow}>
                            <View style={{ marginHorizontal: 10, padding: 10 }}>
                              <DateIcon name={'calendar-outline'} size={20} color={'black'} />
                              <Text>{event.date}</Text>
                            </View>
                            <View>
                              <Text>{event.eventname}</Text>
                            </View>
                          </View>
                          <View style={{ padding: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>{evt.username}</Text>
                            <Text>Recieved: {evt.wage}</Text>
                          </View>
                        </>
                      </View>
                    }
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
    backgroundColor: 'pink',
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