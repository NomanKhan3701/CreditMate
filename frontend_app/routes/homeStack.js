import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Home from "../screens/homepage";
import HomeScreen from "../screens/homeScreen";
import Navbar from "../components/Navbar.jsx";
import PaymentScreen from "../screens/PaymentScreen";
import GeoLocationScreen from "../screens/GeoLocationScreen";
import RedeemScreen from "../screens/RedeemScreen";
import SettingScreen from "../screens/SettingScreen";
import TransactionScreen from "../screens/TransactionScreen";

const screens = {
  Homepage: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  RedeemScreen: {
    screen: RedeemScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  PaymentScreen: {
    screen: PaymentScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  GeoLocationScreen: {
    screen: GeoLocationScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  TransactionScreen: {
    screen: TransactionScreen,
    navigationOptions: {
      headerShown: false,
    },
  },

};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
