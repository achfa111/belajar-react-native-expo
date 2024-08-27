import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import React from "react";
import { Link, router } from "expo-router";
import ModalPopup from "@/components/Modal";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Register() {
  const [modalVisible, setModalVisible] = useState(false)
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
    console.log('test submit')
    try {
      const req = await 
      fetch("https://api-car-rental.binaracademy.org/customer/auth/register", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            role: "Customer",
          })
      })

      const body = await req.json();
      if (!req.ok) throw new Error(body.message || body.errors[0].message || "Somethings Went Wrong!");
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setErrorMessage(null)
        // router.navigate("/");
      }, 2000);

    } catch (e) {
      console.log(e.message);
      setErrorMessage(e.message)
      setModalVisible(true)
      setTimeout(() => {
        setModalVisible(false)
        setErrorMessage(null)
      }, 2000)
    }
  };

  return (
    <View>
      <View style={styles.image}>
        <Image source={require("@/assets/images/LogoTMMIN.png")} />
      </View>

      <Text style={styles.heading}>Sign Up</Text>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Name*</Text>
        <TextInput style={styles.formInput} placeholder="Full Name" />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Email*</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="Example: johndee@gmail.com"
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Create Password</Text>
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
          title="Sign Up"
        />
        <Text style={styles.textRegister}>
          Already have an account?{` `}
          <Link style={styles.linkRegister} href="/">
            Sign In here
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
            😁 Yipppiiyyyyy Register Successed 👍
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
