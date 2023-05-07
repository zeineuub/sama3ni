import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native"; // import useNavigation hook
import Icon from 'react-native-vector-icons/FontAwesome';
const RadioCard = ({ name, image, url,video}) => {

    const navigation = useNavigation(); 
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
        <View style={styles.card}>
            <View style={styles.container}>
                <Image style={styles.image} source={image} />
                <Text style={styles.title}>{name}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Player', { radioName: name, radioUrl:url, radioImageUrl:image, radioVideo: video })}
                    >
                    <Text style={styles.buttonText}>Click Here</Text>
                    <Icon style= {{top:5, left:6}}name="arrow-right" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    card: {
        width: '100%',
        paddingHorizontal: 4,
        marginBottom: 8,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 21,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: 12,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    image: {
        height: 100,
        width: '100%',
        borderRadius: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'left',
        color: '#071F70',
        fontFamily: 'Poppins-Medium',
    },
    button: {
        backgroundColor: '#55BBDA',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'flex-end',
        marginTop: 10,
        paddingHorizontal: 20,
        flex:1,
        flexDirection:"row"
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Poppins-Medium',
    },
});

export default RadioCard;
