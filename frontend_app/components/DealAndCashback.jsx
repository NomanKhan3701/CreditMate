import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Colors from '../constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const DealAndCashback = ({ navigation }) => {
    const user = useSelector(state => state.main.user);

    return (
        <View style={styles.DealAndCashback}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <View style={styles.chip}>
                    <FontAwesome5 name="hand-holding-usd" size={16} color={Colors.gray2} />
                    <Text style={styles.text}>
                        {
                            user.age > 18 ? "Home Loan" : "School Loan"
                        }
                    </Text>
                </View>
                <TouchableOpacity style={styles.chip} onPress={() => navigation.navigate("RedeemScreen")}>
                    <Feather name="shopping-bag" size={16} color={Colors.gray2} />
                    <Text style={styles.text}>Redeem</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DealAndCashback

const styles = StyleSheet.create({
    DealAndCashback: {
    },
    chip: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        marginRight: 10,

    },
    text: {
        marginLeft: 7,
        fontWeight: 500,
        color: Colors.gray2,
        fontSize: 15,
    }
})