import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, RefreshControl, ScrollView } from 'react-native';
import DateIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Fontisto';
import { getEventsStatus } from "../services/api";

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
    getAllEventsStatus();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getAllEventsStatus();
  }, []);

  const getAllEventsStatus = async () => {
    let response = await getEventsStatus();
    if (response) {
      setEvents(response.data.events);
      setCurrentUser(response.data.user);
      setLoading(false);
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
      }
    >
    {loading ?
      <View style={styles.row}>
        <Text>Loading...</Text>
      </View> :
      events.length ?
        <View>
          <View style={styles.overView}>
            <Text style={{ fontSize: 10, color: 'gray' }}>Total events booked: {events.length}</Text>
          </View>
          {events.map((event) => {
            return (
              <View key={event._id} style={[styles.row, { borderWidth: 1, borderColor: '#36828b' }]}>
                <View style={styles.innerRow}>
                  <View style={{ marginHorizontal: 10, padding: 10 }}>
                    <DateIcon name={'calendar-outline'} size={20} color={'black'} />
                    <Text style={{ fontWeight: 'bold' }}>{event.date}</Text>
                    {event.date > formattedToday ? 
                      <Text style={{ fontWeight: 'bold', fontSize: 10 }}>Status: Upcoming</Text> : 
                    event.date < formattedToday ?
                      <Text style={{ fontWeight: 'bold', fontSize: 10 }}>Status: Done</Text> : 
                      <Text style={{ fontWeight: 'bold', fontSize: 10 }}>Status: Today</Text>
                    }
                  </View>
                  <View>
                    <Text style={{ fontWeight: 'bold' }}>{event.eventname}</Text>
                  </View>
                </View>
                <View style={{ padding: 10 }}>
                  {event.attendance.some((staff) => staff === currentUser) ?
                    <View style={{ flexDirection: 'row' }}>
                      <Text>Attended:</Text>
                      <Icon name={'checkbox-active'} size={15} color={'#36828b'} style={{ marginLeft: 100, }} />
                    </View> :
                    <View style={{ flexDirection: 'row' }}>
                      <Text>Attended:</Text>
                      <Icon name={'checkbox-passive'} size={15} color={'gray'} style={{ marginLeft: 100, }} />
                    </View>
                  }
                  {event.payments.some((staff) => staff === currentUser) ?
                    <View style={{ flexDirection: 'row' }}>
                      <Text>Wage Recieved:</Text>
                      <Icon name={'checkbox-active'} size={15} color={'#36828b'} style={{ marginLeft: 60, }} />
                    </View> :
                    <View style={{ flexDirection: 'row' }}>
                      <Text>Wage Recieved:</Text>
                      <Icon name={'checkbox-passive'} size={15} color={'gray'} style={{ marginLeft: 61, }} />
                    </View>
                  }
                </View>
              </View>
              );
            })
          }
        </View> :
        <View style={{ paddingTop: 270, alignItems: 'center' }}>
          <Text>No data found</Text>
        </View>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    padding: 5,
  },
  overView: {
    width: '95%',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 8,
    paddingHorizontal: 0,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
  },
  row: {
    width: '95%',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 8,
    paddingHorizontal: 0,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 5,
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