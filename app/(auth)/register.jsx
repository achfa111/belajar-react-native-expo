import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import React from "react";
import { Link, router } from "expo-router";
import ModalPopup from "@/components/Modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Yup from "yup";
import { Formik } from "formik";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
    .required("Required"),
});

export default function Register() {
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);


  const handleSubmit = async (values) => {
    console.log("test submit");
    try {
      const req = await fetch(
        "https://api-car-rental.binaracademy.org/customer/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: values.email,
            password: values.password,
            role: "Customer",
          }),
        }
      );

      const body = await req.json();
      if (!req.ok)
        throw new Error(
          body.message || body.errors[0].message || "Somethings Went Wrong!"
        );
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setErrorMessage(null);
        // router.navigate("/");
      }, 2000);
    } catch (e) {
      console.log(e.message);
      setErrorMessage(e.message);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setErrorMessage(null);
      }, 2000);
    }
  };

  return (
    <View>
      <View style={styles.image}>
        <Image source={require("@/assets/images/LogoTMMIN.png")} />
      </View>

      <Text style={styles.heading}>Sign Up</Text>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={values => handleSubmit(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Name*</Text>
              <TextInput
                onBlur={handleBlur("name")}
                onChangeText={handleChange("name")}
                style={styles.formInput}
                placeholder="Full Name"
              />
              {errors.name && touched.name ? <Text>{errors.name}</Text> : null}
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Email*</Text>
              <TextInput
                onBlur={handleBlur("email")}
                style={styles.formInput}
                onChangeText={handleChange("email")}
                placeholder="Example: johndee@gmail.com"
              />
              {errors.email && touched.email ? <Text>{errors.email}</Text> : null}
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Create Password</Text>
              <TextInput
                onBlur={handleBlur("password")}
                style={styles.formInput}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                placeholder="6+ Character"
              />
              {errors.password && touched.password ? <Text>{errors.password}</Text> : null}
            </View>

            <View style={styles.formContainer}>

              <TouchableOpacity
                style={styles.formButton}
                onPress={handleSubmit}
              >
                <Text style={styles.textButton}>Register</Text>
              </TouchableOpacity>

              <Text style={styles.textRegister}>
                Already have an account?{` `}
                <Link style={styles.linkRegister} href="/">
                  Sign In here
                </Link>
              </Text>
            </View>
          </>
        )}
      </Formik>

      <ModalPopup visible={modalVisible}>
        <View style={styles.modalBackground}>
          {errorMessage !== null ? (
            <>
              <Ionicons size={32} name={"close-circle"} />
              <Text style={styles.newText2}>{errorMessage}</Text>
            </>
          ) : (
            <>
              <Ionicons size={32} name={"checkmark-circle"} />
              <Text style={styles.newText}>
                😁 Yipppiiyyyyy Register Successed 👍
              </Text>
            </>
          )}
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
    marginTop: 20,
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

  formButton: {
    backgroundColor: "#3D7B3F",
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
});
