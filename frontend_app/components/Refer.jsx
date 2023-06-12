import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Colors from '../constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import reffer from '../assets/images/reffer.png'

const Refer = () => {

    return (
        <View style={styles.Refer}>
            <Text style={styles.text}>Refer friends to get 100 coins</Text>
            <View style={styles.codeContainer}>
                <Text style={styles.textHelper}>Copy your code</Text>
                <View style={styles.code}>
                    <Text style={styles.textCode}>ec1dd07</Text>
                    <Ionicons name="copy-outline" size={20} color={Colors.gray2} />
                </View>
                <View>
                    <Text style={styles.desc}>
                        Share your code with friends and get 100 coins when they sign up.
                    </Text>
                </View>
            </View>
            <Image source={reffer} style={styles.image} />
        </View>
    )
}

export default Refer

const styles = StyleSheet.create({
    Refer: {
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 20,
        paddingTop: 20,
        paddingLeft: 20,
        height: 250,
    },
    text: {
        fontWeight: 500,
        fontSize: 17,
    },
    codeContainer: {

    },
    textHelper: {
        color: Colors.gray2,
        fontSize: 16,
        fontWeight: 500,
        marginTop: 20,
    },
    code: {
        fontWeight: 500,
        fontSize: 17,
        color: Colors.primary,
        marginRight: 10,
        marginTop: 7,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    textCode: {
        fontWeight: 500,
        fontSize: 17,
        color: Colors.primary,
        marginRight: 6,
    },
    image: {
        width: 200,
        height: 200,
        marginLeft: "auto",
        position: "absolute",
        right: 0,
        bottom: 0,
    },
    desc: {
        color: Colors.gray2,
        fontSize: 13,
        marginTop: 40,
        width: 120,
    }
})