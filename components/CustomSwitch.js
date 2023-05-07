import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { useFonts } from "expo-font";

const CustomSwitch = ({
  selectionMode,
  option1,
  option2,
  option3,
  onSelectSwitch,
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };
  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.otf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.otf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.otf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <View
      style={{
        height: 44,
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 1 ? '#55BBDA' : '#DDF0F5',
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight:10,
          marginLeft:10

        }}>
        <Text
          style={{
            color: getSelectionMode == 1 ? 'white' : '#55BBDA',
            fontSize: 20,
            fontFamily: 'Poppins-Medium',
          }}>
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 2 ? '#55BBDA' : '#DDF0F5',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
                  marginRight:10,

        }}>
        <Text
          style={{
            color: getSelectionMode == 2 ? 'white' : '#55BBDA',
            fontSize: 20,
            fontFamily: 'Poppins-Medium',
          }}>
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default CustomSwitch;