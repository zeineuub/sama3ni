import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,ScrollView,TextInput } from 'react-native';
import RadioCard from "../components/RadioCard";
import { useFonts } from "expo-font";
import Icon from 'react-native-vector-icons/FontAwesome';
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomSwitch from '../components/CustomSwitch';
import { useIsFocused } from '@react-navigation/native';

LogBox.ignoreAllLogs();
const tunisianRadios = [
  { id: '1', name: 'Mosaique FM', frequency: '94.9 FM', video:'https://www.youtube.com/@MosaiqueFm/videos',image:require('../assets/images/radio/radio-mosaique.png'),url:'https://radio.mosaiquefm.net/mosalive'},
  { id: '2', name: 'Shems FM', frequency: '101.7 FM',video:'https://www.youtube.com/@SHEMSFMTN/videos',image:require('../assets/images/radio/radio-shams.jpg'),url:'https://radio.shemsfm.net/shems'},
  { id: '3', name: 'Jawhara FM', frequency: '102.5 FM',video:'https://www.youtube.com/@JawharaFM/videos', image:require('../assets/images/radio/radio-jawhara.jpg'),url:'https://streaming2.toutech.net/jawharafm'},
  { id: '4', name: 'Radio IFM', frequency: '100.6 FM', video:'https://www.youtube.com/@RadioIFM/videos',image:require('../assets/images/radio/radio-ifm.jpg'),url:'https://live.ifm.tn/radio/8000/ifmlive?1585304718' },
  { id: '5', name: 'Zitouna FM', frequency: '102.9 FM', video:'https://www.youtube.com/@radiozitounafmTunisie/videos',image:require('../assets/images/radio/radio-zitouna.jpg'),url:'https://stream.radiozitouna.tn/radio/8030/radio.mp3' },
  { id: '6', name: 'Radio Tunisienne', frequency: '96.8 FM',video:'https://www.youtube.com/watch?v=ePU_sHFN0yQ', image:require('../assets/images/radio/radio-tunis.png'),url:'http://rtstream.tanitweb.com/nationale' },
  { id: '7', name: 'Express FM', frequency: '103.6 FM', video:'https://www.youtube.com/@expressfm/videos',image:require('../assets/images/radio/radio-express.jpg'),url:'http://expressfm.ice.infomaniak.ch/expressfm-64.mp3' },
  { id: '8', name: 'KnOOz FM', frequency: '103.6 FM', video:'https://www.youtube.com/@KnOOzFM/videos',image:require('../assets/images/radio/radio-knooz.png'),url:'http://streaming.knoozfm.net:8000/knoozfm' },
  { id: '9', name: 'Radio Sfax', frequency: '93.4 FM',video:'https://www.youtube.com/@radiosfaxfm/videos', image:require('../assets/images/radio/radio-sfax.png') ,url:'http://rtstream.tanitweb.com/sfax'},
  { id: '10', name: 'Sabra FM', frequency: '102.5 FM', video:'https://www.youtube.com/@SabraFmKairouan/videos',image:require('../assets/images/radio/radio-sabra.png'),url:'https://stream6.tanitweb.com/sabrafm'},
  { id: '11', name: 'Radio Jeune', frequency: '88.8 FM' ,video:'https://www.youtube.com/@radiojeunestunisie3849/videos', image:require('../assets/images/radio/radio-jeune.png'), url:'http://rtstream.tanitweb.com/jeunes'},
  { id: '12', name: 'Radio RTCI', frequency: '93.4 FM', video:'',image:require('../assets/images/radio/radio-rtci.png'),url:'http://rtstream.tanitweb.com/rtci' },
  { id: '13', name: 'Radio Culture', frequency: '100.8 FM',video:'https://www.youtube.com/@radioculturelle5427/videos', image:require('../assets/images/radio/radio-culture.png'),url:'http://rtstream.tanitweb.com/culturelle' },
  { id: '14', name: 'Radio Kef', frequency: '88.2 FM', video:'https://www.youtube.com/@radioculturelle5427/videos',image:require('../assets/images/radio/radio-kef.png' ),url:'http://rtstream.tanitweb.com/kef'},
  { id: '15', name: 'Radio Gafsa', frequency: '105.6 FM', video:'https://www.youtube.com/@radioculturelle5427/videos',image:require('../assets/images/radio/radio-gafsa.png'),url:'http://rtstream.tanitweb.com/gafsa' },
  { id: '16', name: 'Radio Monastir', frequency: '106.8 FM',video:'https://www.youtube.com/@radioculturelle5427/videos', image:require('../assets/images/radio/radio-monastir.png'),url:'http://rtstream.tanitweb.com/monastir' },
  { id: '17', name: 'Radio Quran', frequency: '94.8 FM',video:'https://www.youtube.com/@radioqurankarimtunisie3042/videos', image:require('../assets/images/radio/radio-quran.png'),url:'http://virmach2.hajjam.net:8005/' },
  { id: '18', name: 'Radio Tataouine', frequency: '100.8 FM',video:'https://www.youtube.com/@radioqurankarimtunisie3042/videos', image:require('../assets/images/radio/radio-tataouine.png'),url:'http://rtstream.tanitweb.com/tataouine' },
  { id: '19', name: 'Diwan FM', frequency: '102.5 FM',video:'https://www.youtube.com/watch?v=1B4e0E76W0g', image:require('../assets/images/radio/radio-diwan.png'),url:'  https://streaming.diwanfm.net/stream'},
  { id: '20', name: 'Oasis FM', frequency: '96.5 FM',video:'', image:require('../assets/images/radio/radio-oasis.jpg'), url:'http://stream6.tanitweb.com/oasis' },
  { id: '21', name: 'Radio Misk', frequency: '104.4 FM',video:'https://www.youtube.com/@RadioMisk/videos', image:require('../assets/images/radio/radio-misk.png'),url:'http://51.255.235.173:8000/stream' },
  { id: '22', name: 'Radio Med', frequency: '97.1 FM' ,video:'https://www.youtube.com/@radiomedtn/videos', image:require('../assets/images/radio/radio-med.png'),url:'http://stream6.tanitweb.com/radiomed'},
  { id: '23', name: 'Radio MFM', frequency: '90.2 FM',video:'https://www.youtube.com/@RadioMFMTunisie/videos', image:require('../assets/images/radio/radio-mfm.png'), url:'https://mfmtunisie.toutech.net/mfmlive' },
  { id: '24', name: 'Karama FM', frequency: '90.2 FM',video:'https://www.youtube.com/@karamafm5632/videos', image:require('../assets/images/radio/radio-karama.png'), url:'https://stream.rcs.revma.com/7hnrkawf4p8uv.mp3' },
  { id: '26', name: 'Oxygene FM', frequency: '90.2 FM',video:'https://www.youtube.com/@OxygeneTunisie90FM/videos', image:require('../assets/images/radio/radio-oxygene.png'), url:'http://radiooxygenefm.ice.infomaniak.ch/radiooxygenefm-64.mp3' },
  { id: '30', name: 'AlHayat FM', frequency: '90.2 FM', video:'https://www.youtube.com/watch?v=ESseY-MoUbY',image:require('../assets/images/radio/radio-hayat.jpg'), url:'https://manager8.streamradio.fr:2885/stream' },
];  


const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const[favorites, setIsFavorites]=useState([]);
  const [recipeTab, setRecipeTab] = useState(1);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getFavorites = async () => {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        const updatedFavorites = parsedFavorites.map((favorite) => {
          const radio = tunisianRadios.find((radio) => radio.name === favorite.name);
          if (radio) {
            return {
              ...favorite,
              image: radio.image,
              video:radio.video
            };
          }
          return favorite;
        });
        setIsFavorites(updatedFavorites);
      } else {
        setIsFavorites([]);
      }
    };
    getFavorites();
  }, [isFocused]);
  
  const onSelectSwitch = value => {
    setRecipeTab(value);
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
  const filteredRadios = tunisianRadios.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.iconContainer}>
          <Icon name="search" size={18} color="#B2B2B2" />
        </View>
        <TextInput
          style={styles.searchBar}
          placeholder="Name of the radio station ...."
          onChangeText={setSearchTerm}
        />
      </View>
      
      <View style={{ padding: 10, marginTop:50 }}>
        <CustomSwitch
          selectionMode={1}
          option2="Favorites"
          option1="All"
          onSelectSwitch={onSelectSwitch}
        />
        </View>
        <ScrollView style={{ flex: 1 ,padding:10, height:"100%"}}>
        <View style={styles.cardContainer}>
          {recipeTab == 1 &&
            filteredRadios.map((item) => (
              <RadioCard
                name={item.name}
                image={item.image}
                url={item.url}
                video={item.video}
              />
            ))
          }
          </View>
          <View style={[styles.cardContainer,{top:-30}]}>
          {recipeTab == 2 && favorites && favorites &&
            favorites.map((item) => (
              <RadioCard
                name={item.name}
                image={item.image}
                url={item.url}
                video={item.video}
              />
            ))
          }
          </View>
        </ScrollView>
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  lottie_container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 300,
    height: 300,
  },
  recipeTxt:{
    width: 250,
    height: 48,
    left: -50,
    fontFamily: "Poppins-SemiBold",
    fontStyle: "normal",
    fontSize: 32,   
    color: "#EA5753",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
    backgroundColor:'#FFF',
    top:-10
  },
  searchContainer: {
    top:35,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    marginLeft: 5,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    marginLeft:10
  },
  scrollView: {
    width: '100%',
    height:"100%"
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
  },
  cardContainer: {

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 32,

  },
  subTitle:{
    marginTop:10,
    fontFamily:'Poppins-Regular',
    textAlign:'center',
    fontSize:20,
    lineHeight:24,
    width:"70%"
  }
});