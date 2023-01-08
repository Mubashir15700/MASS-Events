import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer';

export default function Login( {navigation} ) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1, marginTop: 80}}>
          <TextInput 
            style={styles.input}
            placeholder="Login ID:"
          />
          <TextInput 
            style={styles.input}
            placeholder="Password:" 
            secureTextEntry={true}
          />
          <TouchableOpacity 
            style={styles.loginBtn}
            onPress={() => {
              navigation.replace('Academic Project');
            }}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius:5,
    borderColor: "pink",
    height: 40,
    width: 300,
    marginBottom: 10,
    padding: 5
  },
  loginBtn: {
    width:100,
    borderRadius:5,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"pink",
 },
});
