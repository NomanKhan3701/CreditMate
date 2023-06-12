import React from "react";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants";
import Navbar from "../components/Navbar";

import NearbyOffers from "../components/NearbyOffers";
import CarouselOffer from "../components/Carousel";

import {
  Button,
  Text,
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal
} from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import Example from "./GeoLocationScreen";
import DealAndCashback from "../components/DealAndCashback.jsx";
import HomeScreen from "./homeScreen";
import Colors from "../constants/Colors";
import RedeemScreen from "./RedeemScreen";
import { navigationRef } from './RootNavigation';
import GeoLocationScreen from "./GeoLocationScreen";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import SettingScreen from "./SettingScreen";
import TransactionScreen from "./TransactionScreen";
import AppTextInput from "../components/AppTextInput";
import axios from "axios";
import { ApiUrl } from "../utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions'

export default function Home({ navigation }) {
  const [paymentModal, setPaymentModal] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.main.user);
  const [paymentData, setPaymentData] = React.useState({
    amount: 0,
    storeName: "",
    transactionType: "",
    tag: "",
  });
  const routes = [
    {
      type: "ant",
      icon: "home",
      name: "home",
      screen: <HomeScreen navigation={navigation} options={{ headerShown: false }} />,
      bottomHide: false,
    },
    {
      type: "material",
      icon: "redeem",
      name: "RedeemScreen",
      screen: <RedeemScreen navigation={navigation} options={{ headerShown: false }} />,
      bottomHide: false,
    },
    {
      type: "ion",
      icon: "location-outline",
      name: "GeoLocationScreen",
      screen: <GeoLocationScreen navigation={navigation} options={{ headerShown: false }} />,
      bottomHide: true,
    },
    {
      type: "ant",
      icon: "setting",
      name: "SettingScreen",
      screen: <SettingScreen navigation={navigation} options={{ headerShown: false }} />,
      bottomHide: false,
    },
  ];

  const [tagList, setTagList] = React.useState([
    {
      name: "Hotel",
      selected: false
    },
    {
      name: "Utility",
      selected: false
    },
    {
      name: "Grocery",
      selected: false
    },
    {
      name: "Food",
      selected: false
    },
    {
      name: "Shopping",
      selected: false
    },
    {
      name: "Travel",
      selected: false
    },
    {
      name: "Gaming",
      selected: false
    }
  ])

  const [transactionTypes, setTransactionTypes] = React.useState([
    {
      name: "Credit",
      selected: false
    },
    {
      name: "Debit",
      selected: false
    },
    {
      name: "UPI",
      selected: false
    },
    {
      name: "Net Banking",
      selected: false
    }
  ])

  const _renderIcon = (routeName, selectedTab) => {
    let route = "";
    routes.forEach((item) => {
      if (item.name === routeName) {
        route = item;
      }
    });

    if (route.type === "ant") {
      return <AntDesign
        name={route.icon}
        size={25}
        color={routeName === selectedTab ? "black" : "gray"}
      />
    } else if (route.type === "material") {
      return <MaterialIcons
        name={route.icon}
        size={25}
        color={routeName === selectedTab ? "black" : "gray"}
      />
    }
    return (
      <Ionicons
        name={route.icon}
        size={25}
        color={routeName === selectedTab ? "black" : "gray"}
      />
    );
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    const bottomHide = routes.find((item) => item.name === routeName).bottomHide;
    return (
      <TouchableOpacity
        onPress={() => {
          if (bottomHide) navigation.navigate(routeName, { name: routeName })
          else navigate(routeName)
        }}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getOfferList();
    getCouponsList();
  }, [])

  const getOfferList = async () => {
    try {
      const res = await axios.get(`https://offers-amal-thundiyil.cloud.okteto.net/api/offers`);
      dispatch(actions.setOfferList(res.data.Offers));
    } catch (e) {
      console.log(e);
    }
  }

  const getCouponsList = async () => {
    try {
      const res = await axios.get(`https://user-amal-thundiyil.cloud.okteto.net/api/coupons`);
      dispatch(actions.setCouponsList(res.data));
    } catch (e) {
      console.log(e);
    }
  }

  const pay = async () => {
    try {
      const res = await axios.post(`${ApiUrl}/transactions`, {
        user_id: user.id,
        amount: parseInt(paymentData.amount),
        paymentCompany: paymentData.storeName,
        product: paymentData.tag,
        transactionDate: new Date(),
        transactionType: paymentData.transactionType
      })
      dispatch(actions.setUser({
        ...user,
        coins: Math.floor(res.data.updatedUser.coins)
      }));
      setPaymentModal(false);
      alert("Payment successful");
    } catch (e) {
      console.log(e);
      alert("Something went wrong while making payment")
    }
  }

  return (
    <NavigationContainer
      screenOptions={{
        headerShown: false
      }}
    >
      <Modal
        animationType="slide"
        visible={paymentModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={{ marginLeft: "auto", marginTop: 15, marginRight: 15 }} onPress={() => setPaymentModal(false)}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.modalBody}>
            <AppTextInput placeholder="Enter amount"
              value={paymentData.amount}
              keyboardType="numeric"
              onChangeText={(text) => {
                setPaymentData({
                  ...paymentData,
                  amount: text
                })
              }}
            />
            <AppTextInput placeholder="Store name"
              value={paymentData.storeName}
              onChangeText={(text) => {
                setPaymentData({
                  ...paymentData,
                  storeName: text
                })
              }}
            />
            <Text style={styles.modalHeader}>Select type</Text>
            <View style={styles.tags}>
              {
                tagList.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} style={item.selected ? styles.tagActive : styles.tag} onPress={() => {
                      let temp = tagList;
                      for (let i = 0; i < temp.length; i++) {
                        if (i !== index) {
                          temp[i].selected = false;
                        }
                      }
                      temp[index].selected = true;
                      setTagList([...temp]);
                      setPaymentData({
                        ...paymentData,
                        tag: item.name
                      })
                    }}>
                      <Text style={item.selected ? styles.tagTextActive : styles.tagText}>{item.name}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            <Text style={styles.modalHeader}>Select transaction type</Text>
            <View style={styles.tags}>
              {
                transactionTypes.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} style={item.selected ? styles.tagActive : styles.tag} onPress={() => {
                      let temp = transactionTypes;
                      for (let i = 0; i < temp.length; i++) {
                        if (i !== index) {
                          temp[i].selected = false;
                        }
                      }
                      temp[index].selected = true;
                      setTransactionTypes([...temp]);
                      setPaymentData({
                        ...paymentData,
                        transactionType: item.name
                      })
                    }}>
                      <Text style={item.selected ? styles.tagTextActive : styles.tagText}>{item.name}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            <TouchableOpacity style={styles.payBtn} onPress={pay}>
              <Text style={styles.payBtnText}>Pay the amount</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="home"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { setPaymentModal(true) }}
            >
              <Text style={styles.pay}>Pay</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        {
          routes.map((route, index) => {
            return (
              <CurvedBottomBarExpo.Screen
                key={index}
                name={route.name}
                component={() => route.screen}
                position={index < 2 ? "LEFT" : "RIGHT"}
                options={{ headerShown: false }}
              />
            )
          })
        }
      </CurvedBottomBarExpo.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pay: {
    fontSize: 18,
    fontWeight: 600,
    color: "white",

  },
  modalBody: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  shawdow: {
    shadowColor: "#DDDDDD",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: "center",
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    bottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    shadowColor: Colors.primary,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: "gray",
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 10
  },
  tag: {
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
  },
  tagText: {

  },
  tagActive: {
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
  },
  tagTextActive: {
    color: "white"
  },
  payBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  payBtnText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  }
});
