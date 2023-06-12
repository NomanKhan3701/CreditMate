import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import Colors from '../constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Link } from 'expo-router';

const ManageMoney = ({ navigation }) => {
    const { navigate } = useNavigation();

    return (
        <View style={styles.ManageMoney}>
            <TouchableOpacity onPress={() =>
                navigation.navigate("TransactionScreen")
            } style={styles.chip} >
                <View style={styles.leftIcon}>
                    <FontAwesome5 name="clock" size={20} color={Colors.primary} />
                </View>
                <Text style={styles.text}>Show transaction history</Text>
                <AntDesign name="right" size={20} color={Colors.gray2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.chip} onPress={() => Alert.alert(
                "Current balance",
                "Your current balance is 127833.00",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )}>
                <View style={styles.leftIcon}>
                    <MaterialCommunityIcons name="bank-outline" size={24} color={Colors.primary} />
                </View>
                <Text style={styles.text}>Check bank balance</Text>
                <AntDesign name="right" size={20} color={Colors.gray2} />
            </TouchableOpacity>
        </View>
    )
}

export default ManageMoney

const styles = StyleSheet.create({
    ManageMoney: {
        marginTop: 18,
    },
    chip: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
    },
    text: {
        marginLeft: 10,
        marginRight: "auto",
        fontWeight: 500,
        fontSize: 16,
        color: Colors.gray3,
    },
    leftIcon: {
        width: 30,
    }
})