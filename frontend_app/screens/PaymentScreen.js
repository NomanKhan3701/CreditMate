import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function PaymentScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Payment Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
