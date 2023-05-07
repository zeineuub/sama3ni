import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Linking,ToastAndroid  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import Icons from 'react-native-vector-icons/FontAwesome';
const TrackDetails = ({ radioName, radioUrl, radioVideo }) => {
  const showToastMsg = (msg) => {
    try {
      ToastAndroid.showWithGravityAndOffset(
        msg,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        100,
        100,
      );
    } catch (err) {
      console.log(err);
    }
  }; 
  useEffect(() => {
    // Add the radio station to favorites if it's not already added
    checkFavorite();
  }, []);
  const [isFavorite,setIsFavorite] = useState(false);
  const addToFavorites = async () => {
    // Toggle the favorite state and add/remove the station from the favorites list
    setIsFavorite(!isFavorite);
    const favorites = await getFavorites();
    if (isFavorite) {
      const updatedFavorites = favorites.filter(station => station.name !== radioName);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const newStation = { name: radioName, url: radioUrl };
      await AsyncStorage.setItem('favorites', JSON.stringify([...favorites, newStation]));
      showToastMsg('Radio station added successfully !')
    }
  };
  const openYoutubeLink = async () => {
    const url = radioVideo;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  }
  const checkFavorite = async () => {
    // Check if the station is already added to the favorites list
    const favorites = await getFavorites();
    const isAlreadyFavorite = favorites.some(station => station.name === radioName);
    setIsFavorite(isAlreadyFavorite);
  };

  const getFavorites = async () => {
    // Get the list of favorite stations from the local storage
    const favorites = await AsyncStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
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
    <View style={styles.container}>
      <View style={styles.detailsWrapper}>
        <Text style={styles.title}>{radioName}</Text>
      </View>
      <TouchableOpacity onPress={addToFavorites}>
        {isFavorite ? (
          <Icon name="favorite" style={styles.moreButton} />
        ) : (
          <Icon name="favorite-border" style={styles.moreButton} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={openYoutubeLink} >
      <Icons name="youtube" style={{marginLeft:20}} size={50}  color="#FF0000" />
      </TouchableOpacity>
    </View>
  );
}

export default TrackDetails;

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    paddingRight: 20,
    top:-30
  },
  detailsWrapper: {
    justifyContent: 'center',
    alignItems:'flex-start',
    flex: 1,
  },
  title: {

    fontSize: 25,
    fontWeight: 'bold',
    color: '#071F70',
    textAlign: 'center',
    fontFamily:'Poppins-Medium'
  },

  button: {
    opacity: 0.72,
    fontSize: 32,
    color: 'black',
    marginRight: 16,
  },
  moreButton: {
    fontSize:36 ,
    color: 'red',
    right:80
  },
});
