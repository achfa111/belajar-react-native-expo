import { View, Image, Text, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";
import React from "react";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";


function getUser() {
  return SecureStore.getItem("user")
}


export default function profile() {
  return (
    <View>
      <View>
        <Text style={styles.title}>Akun</Text>
      </View>

      <View style={styles.container}>
        <View>
          <Image
            style={styles.imageProfile}
            source={require("@/assets/images/AlluraPark1.png")}
          />
        </View>

        <View>
          <Text style={styles.newTitle}>  
            Hi {getUser()}     
          </Text>         
        </View>

        {/* SILAHKAN PAKAI JSON STRINGIFY UNTUK KELUARIN USERNYA AJA */}


        <Button
          style={styles.formContainer}
          onPress={() => router.navigate("../(auth)")}
          color="red"
          title="Logout"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingTop: 80,
  },

  imageProfile: {
    justifyContent: "center",
    // height: 350,
    // width: 350,
    objectFit: "contain",
    width: 312,
    height: 192,
  },

  newTitle: {
    color: "#000000",
    fontFamily: "PoppinsBold",
    fontSize: 14,
    width: 312,
    height: 60,
    marginTop: 30,
    marginBottom: 30,
    textAlign: "center",
  },

  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: 20,
  },


});
