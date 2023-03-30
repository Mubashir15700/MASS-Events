import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, RefreshControl, ScrollView } from 'react-native';
import DateIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getPayments } from "../services/api";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default Payments = () => {

  const [paidEvents, setPaidEvents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
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
      setPaidEvents(response.data.paidEvents);
      setStaff(response.data.staff);
      setTotalPaid(response.data.staff.totalPaid);
      setTotalPending(response.data.staff.totalPending);
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
      }
    >
    {loading ?
      <View style={styles.row}>
        <Text>Loading...</Text>
      </View> :
      paidEvents.length ?
        <View>
          <View style={styles.overView}>
            <Text style={{ fontSize: 10, color: 'gray' }}>
              Total wage recieved: {totalPaid * staff.payment}
            </Text>
            <Text style={{ fontSize: 10, color: 'gray' }}>
              Payments pending: {totalPending * staff.payment}
            </Text>
          </View>
          {paidEvents.map((paidEvent) => {
            return (
              <View key={paidEvent._id} style={[styles.row, { borderWidth: 1, borderColor: '#4682b4' }]}>
                <View style={styles.innerRow}>
                  <View style={{ marginHorizontal: 10, padding: 10 }}>
                    <DateIcon name={'calendar-outline'} size={20} color={'#4682b4'} />
                    <Text style={{ fontWeight: 'bold' }}>{paidEvent.date}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{paidEvent.eventname}</Text>
                  </View>
                  <View style={{ padding: 10 }}>
                    {paidEvent.payments.some((payment) => payment === staff.staffId) ?
                    <Text>Wage Recieved: {staff.payment}</Text> :
                    <Text>Wage Recieved: pending</Text>}
                </View>
                </View>
              </View>
            );
          })}
        </View> :
        <View style={{ paddingTop: 270, alignItems: 'center' }}>
          <Text>No data found</Text>
        </View>
      }
    </ScrollView >
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
    height: 35,
    justifyContent: 'center',
    borderRadius: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#4682b4",
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