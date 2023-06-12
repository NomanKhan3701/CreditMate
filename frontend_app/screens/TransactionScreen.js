import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Navbar from '../components/Navbar'
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ApiUrl } from '../utils';

const TransactionScreen = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const user = useSelector(state => state.main.user);

    useEffect(() => {
        getTransactions()
    }, [])

    const getTransactions = async () => {
        try {
            const res = await axios.get(`https://user-amal-thundiyil.cloud.okteto.net/api/transactions/user/${user.id}`);
            setData(res.data)
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <View style={styles.TransactionScreen}>
            <Navbar />
            <View style={styles.listContainer}>
                {
                    data.map((item, index) => {
                        return (
                            <View style={styles.item} key={index}>
                                <Text style={styles.name}>{item.paymentCompany}</Text>
                                <Text style={styles.amount}>₹{item.amount}</Text>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default TransactionScreen

const styles = StyleSheet.create({
    TransactionScreen: {

    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    listContainer: {
        paddingHorizontal: 18,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        marginTop: 20,
    },
    item: {
        width: 168,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.green,
    },
    coinContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 5,
    },
    coin: {
        color: Colors.yellow,
        fontWeight: 'bold',
    }

})