import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import { Link, router } from "expo-router";
import ModalPopup from "@/components/Modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value)
}

export default function Login() {
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name, text) => {
    setFormData({
      ...formData,
      [name]: text,
    });
    console.log(formData);
  };

  const handleSubmit = async () => {
    console.log("test submit", formData);
    try {
      const req = await fetch(
        "https://api-car-rental.binaracademy.org/customer/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const body = await req.json();
      console.log(body)
      if (!req.ok) throw new Error(body.message || body.errors[0].message || "Somethings Went Wrong!");
      save("user", JSON.stringify(body))
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setErrorMessage(null)
        router.navigate("./(tabs)");
      }, 2000);
    } catch (e) {
      console.log(e);
      console.log(e.message);
      // setErrorMessage(e.message)
      // setModalVisible(true)
      // setTimeout(() => {
      //   setModalVisible(false)
      //   setErrorMessage(null)
      // }, 2000)
    }
  };

  return (
    <View>
      <View style={styles.image}>
        <Image source={require("@/assets/images/LogoTMMIN.png")} />
      </View>

      <Text style={styles.heading}>Welcome Back!</Text>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Email</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="Example: johndee@gmail.com"
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Password</Text>
        <TextInput
          style={styles.formInput}
          secureTextEntry={true}
          onChangeText={(text) => handleChange("password", text)}
          placeholder="6+ Character"
        />
      </View>

      <View style={styles.formContainer}>
        <Button
          onPress={() => handleSubmit()}
          color="#3D7B3F"
          title="Sign In"
        />
        <Text style={styles.textRegister}>
          Don't have an account?{` `}
          <Link style={styles.linkRegister} href="./register">
            Sign up for free
          </Link>
        </Text>
      </View>

      <ModalPopup visible={modalVisible}>
        <View style={styles.modalBackground}>
          { errorMessage !== null ?
           <>
           <Ionicons size={32} name={"close-circle"} />
           <Text style={styles.newText2}>{errorMessage}
           </Text>
            </> 
           :
           <>
           <Ionicons size={32} name={"checkmark-circle"} />
          <Text style={styles.newText}>
            Login Successed 👍
            </Text>
            </>
          }
        </View>
      </ModalPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    marginLeft: 20,
    marginTop: 20,
  },

  heading: {
    fontSize: 40,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    marginVertical: 40,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  formLabel: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    borderRadius: 10,
  },
  formInput: {
    borderWidth: 1,
    padding: 10,
  },
  textRegister: {
    marginTop: 10,
    textAlign: "center",
  },
  linkRegister: {
    color: "#0D28A6",
    textDecorationLine: "underline",
  },
  modalBackground: {
    alignItems: "center",
    width: "90%",
    backgroundColor: "#ffffff",
    elevation: 20,
    borderRadius: 4,
    padding: 20,
  },

  newText2: {
    fontFamily: "PoppinsBold",
    color: "red",
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
  },
  
    newText: {
      fontFamily: "PoppinsBold",
      color: "#3D7B3F",
      fontSize: 15,
      marginTop: 10,
      textAlign: "center",
    },
});
