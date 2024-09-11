import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, Logout } from "@/redux/reducer/auth/loginSlice";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
 
import { useState, useEffect } from "react";
 
async function getUserEmail() {
  try {
    const userData = await SecureStore.getItemAsync("user");
    if (userData) {
      const userObject = JSON.parse(userData);
      return userObject.email || "Email tidak ditemukan";
    }
    return "User tidak ditemukan";
  } catch (error) {
    console.error("Error mengambil email:", error);
    return "Terjadi kesalahan saat mengambil email";
  }
}
 
export default function profile() {

  const { data, isLogin } = useSelector(selectUser)               // bang amir
  const dispatch = useDispatch()                                  // bang amir
 
  const [email, setEmail] = useState('');
 
  useEffect(() => {
    async function fetchEmail() {
      const userEmail = await getUserEmail();
      setEmail(userEmail);
    }
 
    fetchEmail();
  }, []);
 
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
 
        <View style={styles.buttonContainer}>

          <View>
            <Text style={styles.newTitle}>Hi, {data.email}</Text>
          </View>
 
          <TouchableOpacity
            style={styles.formButton}
            onPress={() => {
            router.navigate("../(auth)")
            }}
            >
            <Text style={styles.textButton}>Logout</Text>
          </TouchableOpacity>

        </View>

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
    objectFit: "contain",
    width: 312,
    height: 192,
    marginTop: 50,
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
    marginBottom: 20,
    marginTop: 20,
  },
 
  formButton: {
    backgroundColor: "#AF392F",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
 
  textButton: {
    fontFamily: "PoppinsBold",
    color: "#ffffff",
    textAlign: "center",
  },

  buttonContainer: {
    paddingLeft: 50,
    paddingRight: 50,
  }
});
 
 