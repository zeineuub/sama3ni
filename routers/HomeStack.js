import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen';
import PlayerScreen from '../screens/PlayerScreen';
import { useFonts } from "expo-font";
import { Image, StyleSheet, View ,Text} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const HomeStack = ({navigation}) => {

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
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: true,
        headerStyle: {
          backgroundColor: "white",
          elevation: 0, // Android
        },
        headerTitleStyle: {
          fontFamily: "Poppins-Medium",
          fontSize: 30,
          fontWeight: "bold",
          color:"#01438F"
        },
        headerTitleAlign: "left",

        
      }}
    >
      <Stack.Screen 
        name="Home" 
        options={{
          title:"",
          tabBarVisible: false ,
          animationEnabled: true,
          fontSize:20,
          headerTitle: () => (
            <View style={styles.header}>
              <Text style={{    fontFamily: "Poppins-Medium",fontSize:25,fontWeight: "bold",color:"#01438F"}}>Radio Stations</Text>
              <Image source={require('../assets/adaptive-icon.png')} style={styles.logo} resizeMode="contain" />
            </View>
          ),
        }}
        component={HomeScreen} 
      />
      <Stack.Screen
        name="Player" 
        options={{
          title:"",
          headerBackButtonMenuEnabled:false,
          animationEnabled: false,
          headerBackButton: () => (
            <Ionicons
              name="ios-arrow-back"
              size={40}
              color="black"
              onPress={() => navigation.goBack()}
            />
          ),
          headerTitle: () => (
            <View style={styles.header}>
              <Image source={require('../assets/adaptive-icon.png')} style={[styles.logo,{left:250}]} resizeMode="contain" />
            </View>
          ),
        }}
        component={PlayerScreen} 
      />
    </Stack.Navigator>
  )
}

export default HomeStack;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",


  },
  logo: {
    width: 50,
    height: 50,
  },
  logoTitle: {
    width: 200,
    height: 50,
  },
});
