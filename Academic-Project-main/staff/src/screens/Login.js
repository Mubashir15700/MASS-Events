import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { loginStaff } from '../services/api';
import Footer from '../components/Footer';

export default function Login(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const response = await loginStaff(username, password);
    //console.log(response.data);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1, marginTop: 300}}>
          <TextInput 
            style={styles.input}
            placeholder="User Name:"
            name="username"
            value={username}
            onChangeText={(e) => setUsername(e)}
          />
          <TextInput 
            style={styles.input}
            placeholder="Password:" 
            name="password"
            value={password}
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e)}
          />
          <TouchableOpacity 
            style={styles.loginBtn}
            onPress={() => submit()}
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
