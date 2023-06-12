import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const screens = {
    WelcomeScreen: {
        screen: WelcomeScreen,
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
};

const authStack = createStackNavigator(screens);

export default createAppContainer(authStack);
