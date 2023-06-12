import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../types";
import AppTextInput from "../components/AppTextInput";
import axios from "axios";
import { ApiUrl } from "../utils";
import * as actions from "../store/actions";

// type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen = ({ navigation: { navigate } }) => {
  const [user, setUser] = React.useState({
    email: "",
    name: "",
    password: "",
    age: "",
    tags: []
  });

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

  const signup = () => {
    if (user.email === "" || user.password === "" || user.age === "" || user.tags.length === 0) {
      alert("Please fill all the fields")
      return
    } else {
      try {
        const res = axios.post(`${ApiUrl}/signup`, {
          name: user.name,
          email: user.email,
          password: user.password,
          age: user.age,
          interests: user.tags
        })
      } catch (e) {
        alert("Something went wrong while signing up")
      }
    }
  }

  const updateTagList = (index) => {
    let temp = [...tagList]
    temp[index].selected = !temp[index].selected
    setTagList(temp)

    let tags = []
    temp.forEach((tag) => {
      if (tag.selected) {
        tags.push(tag.name)
      }
    })
    setUser({ ...user, tags: tags })
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
            Create account
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
          <AppTextInput placeholder="Name"
            onChangeText={(text) => setUser({ ...user, name: text })}
            value={user.name}
          />
          <AppTextInput placeholder="Password"
            onChangeText={(text) => setUser({ ...user, password: text })}
            value={user.password}
          />
          <AppTextInput placeholder="age"
            onChangeText={(text) => setUser({ ...user, age: text })}
            value={user.age}
          />
          <View style={styles.tags}>
            {
              tagList.map((tag, index) => {
                return (
                  <TouchableOpacity key={index} style={tag.selected ? styles.tagActive : styles.tag} onPress={() => {
                    updateTagList(index)
                  }}>
                    <Text style={tag.selected ? styles.tagTextActive : styles.tagText}>{tag.name}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>

        <TouchableOpacity
          onPress={signup}
          style={{
            padding: 8,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 0,
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
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("LoginScreen")}
          style={{
            padding: 20,
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
            Already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: Spacing
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
  }

})