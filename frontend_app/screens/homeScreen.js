import React from 'react'
import { COLORS, FONT, SIZES, SHADOWS } from "../constants";
import Navbar from "../components/Navbar";

import NearbyOffers from "../components/NearbyOffers";
import CarouselOffer from "../components/Carousel";
import DealAndCashback from "../components/DealAndCashback.jsx";

import {
    Button,
    Text,
    Alert,
    Animated,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    View,
} from "react-native";
import ManageMoney from '../components/ManageMoney';
import Refer from '../components/Refer';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const HomeScreen = ({ navigation }) => {
    return (

        <View style={styles.container}>
            <ScrollView vertical={true} style={styles.scrollView}>
                <Navbar />
                <View style={styles.body}>
                    <CarouselOffer />
                    <NearbyOffers navigation={navigation} />
                    <Text style={styles.header}>Deals and cashbacks</Text>
                    <DealAndCashback navigation={navigation} />
                    <Text style={styles.header}>Manage your money</Text>
                    <ManageMoney navigation={navigation} />
                    <Refer />
                </View>
            </ScrollView>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
    },

    body: {
        paddingHorizontal: 18,
        paddingBottom: 100,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 15,
    }
})