import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Colors from '../constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const Navbar = ({ navigation }) => {
    const user = useSelector(state => state.main.user);

    return (
        <View style={styles.navbar}>
            <View style={styles.logo}>
                <Text style={styles.logoText}>Credit</Text>
                <Text style={styles.logoTextWithColor}>Mate</Text>
            </View>
            <View style={styles.navMenu}>
                <View style={styles.coins}>
                    <FontAwesome5 name="coins" size={24} color="black" style={styles.icon} />
                    <Text style={styles.coinsText}>{user.coins}</Text>
                </View>
                <TouchableOpacity onPress={() => { }}>
                    <Image source={require('../assets/images/kemal.jpg')} style={styles.profile} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: Colors.white,
        height: 50,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        height: 80,
        paddingTop: 30,
    },
    navMenu: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },
    icon: {
        fontSize: 14,
        color: Colors.gray2,
    },
    coins: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    logo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoTextWithColor: {
        fontSize: 18,
        color: Colors.primary,
        fontWeight: 'bold',
    },
    profile: {
        borderRadius: 10,
        width: 33,
        height: 33,
    }
})
