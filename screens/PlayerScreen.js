import React, {useState,useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import AlbumArt from '../components/AlbumArt';
import TrackDetails from '../components/TrackDetails';
import Controls from '../components/Controls';

const PlayerScreen = ({ route }) => {
  const { radioUrl, radioName,radioImageUrl,radioVideo} = route.params;
  const [sound, setSound] = React.useState();
  const [playbackStatus, setPlaybackStatus] = React.useState({
    isPlaying: true,
    playbackInstancePosition: 0,
    playbackInstanceDuration: 0,
  });
  const [favoriteRadios, setFavoriteRadios] = useState([]);

  // function to load the favorite radio stations from AsyncStorage
  const loadFavoriteRadios = async () => {
    const favorites = await getFavoriteRadios();
    setFavoriteRadios(favorites);
  };

  useEffect(() => {
    loadFavoriteRadios();
  }, []);
  async function playSound() {
    try {
        showToastMsg('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(
        { uri: radioUrl },
        { shouldPlay: true }
      );
      setSound(sound);

      showToastMsg('Playing Sound');
      setPlaybackStatus({
        ...playbackStatus,
        isPlaying: true,
        playbackInstanceDuration: sound.durationMillis,
      });
    } catch (error) {
        showToastMsg('Error playing sound play', error);
    }
  }
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
  async function pauseSound() {
    try {
      if (sound) {
        await sound.pauseAsync();
        setPlaybackStatus({
          ...playbackStatus,
          isPlaying: false,
          playbackInstancePosition: await sound.getPositionAsync(),
        });
      }
    } catch (error) {
      console.log('Error pausing sound pause', error);
    }
  }

  async function resumeSound() {
    try {
      if (sound && !playbackStatus.isPlaying) {
        await sound.playAsync();
        setPlaybackStatus({
          ...playbackStatus,
          isPlaying: true,
        });
      }
    } catch (error) {
      console.log('Error resuming sound resume', error);
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
        showToastMsg('Sound Paused');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Header message="Playing From Radio stations" />
      <AlbumArt url={radioImageUrl} />
      <TrackDetails radioVideo={radioVideo} radioName={radioName} radioUrl={radioUrl}/>
      <Controls
        onPressPlay={playSound}
        onPressPause={pauseSound}
        onPressResume={resumeSound}
        paused={!playbackStatus.isPlaying}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlayerScreen;