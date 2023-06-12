import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Colors from '../constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import MapOffer from '../components/MapOffer';
import BottomSheet from '@gorhom/bottom-sheet';
import { StackActions, withNavigation } from '@react-navigation/native';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Map from '../components/Map';
export default GeoLocationScreen = ({ navigation }) => {
  const snapPoints = useMemo(() => ['5%', '85%'], []);
  const CustomHandler = useCallback(() => {
  }, []);
  const [pin, setPin] = useState({
    latitude: 19.1231681,
    longitude: 72.836112,
  });

  // useEffect (() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     this.setState({position: {longitude: position.longitude, latitude: position.latitude}});
  // }, (error) => {
  //     alert(JSON.stringify(error))
  // }, {
  //     enableHighAccuracy: true,
  //     timeout: 20000,
  //     maximumAge: 1000
  // });
  // }, [])

  const handleBack = () => {
    navigation.navigate("Home");
  }

  const BackgroundMap = useCallback(() => {
    return (
      <Map pin={pin} setPin={setPin}></Map>
    );
  }, []);


  return (
    <BottomSheet
      index={0}
      backdropComponent={BackgroundMap}
      snapPoints={snapPoints}
      handleComponent={CustomHandler}
    >
      <View style={styles.offerContainer}>
        <View style={styles.tab} />
        <MapOffer pin={pin} />
      </View>

    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: Colors.primary,
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 40,
  },
  tab: {
    backgroundColor: Colors.gray,
    height: 5,
    width: 200,
    marginTop: 20,
    alignSelf: "center",

  },
  offerContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 18,
  },

});