import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Switch } from 'react-native'
import { COLORS, FONT, SIZES, SHADOWS } from "../constants";
import profile from '../assets/images/kemal.jpg'
import Colors from '../constants/Colors';
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const SettingScreen = () => {
    const [isLocationEnabled, setIsLocationEnabled] = useState(true);
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
    const user = useSelector(state => state.main.user);

    return (
        <View style={styles.SettingScreen}>
            <View style={styles.Profile}>
                <Image source={profile} style={styles.image} />
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>
            <View style={styles.helperHeader}>
                <Text style={styles.textHelper}>Accessibility </Text>
            </View>
            <View style={styles.list}>
                <View style={styles.listItem}>
                    <Ionicons name="location-outline" size={24} color="black" />
                    <Text style={styles.itemText}>Location access</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={'#f4f3f4'}
                        onValueChange={() => setIsLocationEnabled(previousState => !previousState)}
                        value={isLocationEnabled}
                    />
                </View>
                <View style={styles.listItem}>
                    <Ionicons name="notifications-outline" size={22} color="black" />
                    <Text style={styles.itemText}>Notification access</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={'#f4f3f4'}
                        onValueChange={() => setIsNotificationEnabled(previousState => !previousState)}
                        value={isNotificationEnabled}
                    />
                </View>
            </View>
        </View>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    SettingScreen: {
        paddingTop: 50,
        paddingHorizontal: 18,
    },
    userName: {
        fontSize: 22,
        fontWeight: 600,
    },
    textHelper: {
        fontWeight: 600,
        color: Colors.gray2,
    },
    Profile: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        color: Colors.gray2,
        fontWeight: 600,
    },
    helperHeader: {
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.gray1,
        marginBottom: 10,
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
    },
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        marginRight: "auto",
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 16,
    }
})