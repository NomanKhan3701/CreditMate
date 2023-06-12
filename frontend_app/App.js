import React, { useEffect, useState } from "react";
import { Text, AsyncStorage } from "react-native";
import * as Font from "expo-font";
import { LogBox } from 'react-native';
import { Provider } from "react-redux";
import { store } from "./store/createStore.js";
import Layout from "./screens/Layout.js";
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    prepareResources();
  }, [])

  prepareResources = async () => {
    await cacheAssets();
    setAppIsReady(true);
  };

  if (!appIsReady) {
    return <Text>loading... </Text>;
  }

  return (
    <>
      <Provider store={store}>
        <Layout />
      </Provider>
    </>

  );

}

async function cacheAssets() {
  const fontAssets = cacheFonts([
    { "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf") },
    { "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf") },
    { "poppins-semiBold": require("./assets/fonts/Poppins-SemiBold.ttf") },
  ]);

  await Promise.all([...fontAssets]);
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}
