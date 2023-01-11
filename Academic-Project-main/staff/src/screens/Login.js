import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { loginStaff } from '../services/api';
import Footer from '../components/Footer';

const defaultValue = {
  username: '',
  password: '',
}

export default function Login(props) {

  const [staff, setStaff] = useState(defaultValue);

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  }

  const loginStaffDetails = async () => {
    await loginStaff(staff);
    console.log(staff);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1, marginTop: 300}}>
          <TextInput 
            style={styles.input}
            placeholder="User Name:"
            name="username"
            onChangeText={(e) => handleChange(e)}
          />
          <TextInput 
            style={styles.input}
            placeholder="Password:" 
            name="password"
            secureTextEntry={true}
            onChangeText={(e) => handleChange(e)}
          />
          <TouchableOpacity 
            style={styles.loginBtn}
            onPress={() => loginStaffDetails()}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
      </View>
      {/* <Footer /> */}
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
