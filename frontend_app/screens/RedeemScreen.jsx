import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Colors from '../constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Navbar from "../components/Navbar";
import { useSelector } from 'react-redux';

export default function RedeemScreen({ navigation, coins, setCoins }) {
    const couponsList = useSelector(state => state.main.couponsList);
    const [filterData, setFilterData] = useState([
        {
            name: "Food",
            active: true,
        },
        {
            name: "Shopping",
            active: false,
        },
        {
            name: "Hotel",
            active: false,
        },
        {
            name: "Travel",
            active: false,
        },
        {
            name: "Grocery",
            active: false,
        },
        {
            name: "Gaming",
            active: false,
        }
    ])
    const [currOfferList, setCurrOfferList] = useState([]);

    useEffect(() => {
        const currName = filterData.find((item) => item.active === true).name;
        const offers = couponsList.filter((item) => {
            return item.tag.toLocaleLowerCase() === currName.toLocaleLowerCase();
        })
        setCurrOfferList(offers);
    }, [filterData]);

    const handleItemChange = (item) => {
        const newData = filterData.map((dataItem) => {
            if (dataItem.name === item.name) {
                dataItem.active = true;
            } else {
                dataItem.active = false;
            }
            return dataItem;
        })
        setFilterData(newData);
    }

    const claim = (item) => {
        const newOfferData = [...currOfferList];
        const index = newOfferData.indexOf(item);
        newOfferData[index].claimed = !newOfferData[index].claimed;
        setCurrOfferList(newOfferData);
    }

    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.paddingContainer}>
                <View style={styles.filterList}>
                    <View style={styles.filterIcon}>
                        <AntDesign name="filter" size={24} color="black" />
                    </View>
                    <FlatList
                        horizontal
                        data={filterData}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={item.active ? styles.chipActive : styles.chip} onPress={() => handleItemChange(item)}>
                                <Text style={{ textAlign: "center", color: item.active ? "white" : "black" }}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        showsHorizontalScrollIndicator={false}
                        style={styles.list}
                    />
                </View>
                <ScrollView vertical={true} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.offers}>
                        {
                            currOfferList.map((item, index) => (
                                <View style={styles.offer}>
                                    <Image source={{ uri: "https://source.unsplash.com/random/?logo" }} style={styles.image} />
                                    <View style={styles.overlay}></View>
                                    <View style={styles.offerDetails}>
                                        <View style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                                            <Text style={styles.company}>{item.company.substring(0, 16)}</Text>

                                        </View>
                                        <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                            <View style={{ display: 'flex', flexDirection: "row", alignItems: "center" }}>
                                                <FontAwesome5 name="clock" size={14} color={Colors.gray} />
                                                <Text style={styles.lightText}>9am - 10pm</Text>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={styles.claimContainer}>
                                        {
                                            item.claimed ? <TouchableOpacity style={styles.btn} onPress={() => claim(item)}>
                                                <Text style={styles.btnText}>e1hf873</Text>
                                            </TouchableOpacity>
                                                : <TouchableOpacity style={styles.btn} onPress={() => claim(item)}>
                                                    <Text style={styles.btnText}>Claim</Text>
                                                </TouchableOpacity>
                                        }
                                        <Text style={styles.ammount}>{item.offer} off</Text>
                                    </View>

                                </View>
                            ))
                        }

                    </View>
                </ScrollView>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    paddingContainer: {
        paddingHorizontal: 18,
        marginTop: 20
    },
    header: {
        marginVertical: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    scrollView: {
        maxHeight: "83%",
    },
    headText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    filterList: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 20,
    },
    list: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 10,
    },
    chip: {
        borderWidth: 1,
        borderColor: Colors.gray2,
        display: "flex",
        alignSelf: "center",
        paddingTop: 0,
        paddingHorizontal: 15,
        paddingVertical: 3,
        paddingTop: 3,
        justifyContent: "center",
        resizeMode: "cover",
        borderRadius: 20,
        marginRight: 10,
    },
    chipActive: {
        borderWidth: 1,
        borderColor: Colors.primary,
        backgroundColor: Colors.primary,
        display: "flex",
        alignSelf: "center",
        paddingTop: 0,
        paddingHorizontal: 15,
        paddingVertical: 3,
        paddingTop: 3,
        justifyContent: "center",
        borderRadius: 20,
        marginRight: 10,
    },
    offers: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 20,
        marginTop: 10,
    },
    offer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 10,
        position: "relative",
        width: 166,
        height: 120
    },
    overlay: {
        width: "100%",
        height: 70,
        backgroundColor: "rgba(0,0,0,0.6)",
        position: "absolute",
        top: 0,
        left: 0,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    image: {
        width: "100%",
        height: 70,
        borderRadius: 10,
        position: "absolute",
        top: 0,
        left: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    offerDetails: {
        display: "flex",
        flex: 1,
        padding: 10,
    },
    company: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    lightText: {
        color: Colors.gray,
        marginLeft: 4,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: Colors.gray2,
        marginHorizontal: 8,
    },
    btn: {
        borderWidth: 1,
        borderColor: Colors.gray2,
        padding: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    btnText: {
        color: Colors.gray2,
        fontWeight: "bold",
    },
    claimContainer: {
        position: "absolute",
        bottom: 10,
        left: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 145,
    },
    ammount: {
        fontSize: 16,
        fontWeight: 500,
        color: Colors.green,
    }
});
