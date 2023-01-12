import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable, RefreshControl, ScrollView, Alert } from 'react-native';
import { getEvents } from '../services/api';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Sites() {

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
    console.log(response);
    setEvents(response.data);
    setLoading(false);
  }

  return (
    <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      {
        events.length ?
          loading ? (<Text>Loading...</Text>) :
            events.map((event, index) => {
              return (
                <View key={index} style={styles.row}>
                  <View>
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
                  </View>
                  <Pressable style={styles.actionBtn} onPress={() => Alert.alert("Book " + event.eventname)}>
                    <Text>Book</Text>
                  </Pressable>
                </View>
              );
            }) :
          (<Text>Nothing to show here</Text>)
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
});
