import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Footer() {
    return (
        <View style={styles.footer}>
            <Text style={styles.text}><Icon name="copyright" size={15} color="#fff" /> Copyright</Text>
        </View>
    );
} 

const styles = StyleSheet.create({
    footer: {
        height: 60,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'pink',      
    },
    text: {
        textAlign: 'center',
        marginTop: 25,
    	fontSize: 12,
        color: '#fff',
    }
});
