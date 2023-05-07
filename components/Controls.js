import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const Controls = ({
  paused,
  onPressPlay,
  onPressPause,
  onPressResume 
}) => {
  return(
  <View style={styles.container}>
    <View style={{ width: 20 }} />
    <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={onPressPause}>
          <View style={{ paddingLeft: 10,left:-50 }}>
            <AntDesign name="pause" size={80} color="#2E2F5D" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={paused ? onPressResume : onPressPlay} >
          <View style={{ paddingRight: 10,right:-20 }}>
            <Ionicons name="ios-play-circle" size={80} color="#2E2F5D" />
          </View>
        </TouchableOpacity>
      </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },

  secondaryControl: {
    top:10,
    height: 60,
    width: 60,
    marginLeft: 10,
    marginRight: 10,
    alignSelf:'center'
  },
});

export default Controls;
