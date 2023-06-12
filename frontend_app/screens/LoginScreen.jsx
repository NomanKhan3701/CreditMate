import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../types";
import AppTextInput from "../components/AppTextInput";
import axios from "axios";
import * as actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { ApiUrl } from "../utils";

const LoginScreen = ({ navigation }) => {
  const [user, setUser] = React.useState({
    email: "",
    password: ""
  });
  const dispatch = useDispatch();

  const login = async () => {
    if (user.email === "" || user.password === "") {
      alert("Please fill all the fields");
      return;
    } else {
      try {
        const res = await axios.post(`${ApiUrl}/login`, {
          email: user.email,
          password: user.password,
        });
        dispatch(actions.setUser({
          token: res.data.token,
          name: res.data.user.name,
          email: res.data.user.email,
          id: res.data.user._id,
          age: res.data.user.age,
          tags: res.data.user.interests,
          coins: res.data.user.coins,
        }))
      } catch (e) {
        console.log("error", e);
        alert("Something went wrong while logging in");
      }
    }
  }

  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
          paddingTop: 80,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: Font["poppins-bold"],
              marginVertical: Spacing * 3,
            }}
          >
            Login here
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <AppTextInput placeholder="Email"
            onChangeText={(text) => setUser({ ...user, email: text })}
            value={user.email}
          />
          <AppTextInput placeholder="Password"
            onChangeText={(text) => setUser({ ...user, password: text })}
            value={user.password}
          />
        </View>

        <View>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.small,
              color: Colors.primary,
              alignSelf: "flex-end",
            }}
          >
            Forgot your password ?
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen")}
          style={{
            padding: 10,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 3,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-bold"],
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
            onPress={login}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterScreen")}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Create new account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
