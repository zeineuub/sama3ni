import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Header = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Radio Station</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    backgroundColor: 'white',
    top:-80
  },
  message: {
    flex: 1,
    textAlign: 'center',
    color: '#212121',
    fontWeight: 'bold',
    fontFamily: "Poppins-Medium",
    fontSize: 30,
    color:"#01438F"
  },
  button: {
    opacity: 0.72,
    tintColor: '#212121',
  },
});

export default Header;
