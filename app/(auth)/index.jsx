import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, router } from "expo-router";
import ModalPopup from "@/components/Modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { postLogin, selectUser, closeModal, clearError } from "@/redux/reducer/auth/loginSlice";
import * as Yup from "yup";
import { Formik } from "formik";
import auth from "@react-native-firebase/auth";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(20, "Too Long!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Required"),
});

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export default function Login() {
  const { errorMessage, isModalVisible, isError } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const handleChange = (name, text) => {
  //   setFormData({ ...formData, [name]: text });
  //   console.log(formData);
  // };

  const handleSubmit = async (values) => {
    console.log("test submit");
    dispatch(postLogin(values));
    // try {

    //   const body = await req.json();
    //   console.log(body);
    //   if (!req.ok)
    //     throw new Error(
    //       body.message || body.errors[0].message || "Somethings Went Wrong!"
    //     );
    //   save("user", JSON.stringify(body));
    //   setModalVisible(true);
    //   setTimeout(() => {
    //     setModalVisible(false);
    //     setErrorMessage(null);
    //     router.navigate("./(tabs)");
    //   }, 2000);
    // } catch (e) {
    //   setErrorMessage(e.message);
    //   setModalVisible(true);
    //   setTimeout(() => {
    //     setModalVisible(false);
    //   }, 2000);
    //   console.log(e);
    //   console.log(e.message);
    // }
  };

  // dibawah ini copas dari web firebase : https://rnfirebase.io/auth/social-auth#google yg kita akses
  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token

      const {
        data: { idToken },
      } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log(idToken, googleCredential);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log(e);
    }
  }

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log(user);
    // if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        dispatch(closeModal());
        setTimeout(() => {
          dispatch(clearError());
        }, 500);
        if (!isError) router.replace("../(tabs)");
      }, 2000);
    }
  }, [isModalVisible]);

  return (
    <View>
      <View style={styles.image}>
        <Image source={require("@/assets/images/LogoTMMIN.png")} />
      </View>

      <Text style={styles.heading}>Welcome Back!</Text>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => handleSubmit(values)}
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
              <Text style={styles.formLabel}>Email</Text>
              <TextInput
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
                style={styles.formInput}
                placeholder="Example: johndee@gmail.com"
              />
              {errors.email && touched.email ? (
                <Text>{errors.email}</Text>
              ) : null}
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Password</Text>
              <TextInput
                onBlur={handleBlur("password")}
                style={styles.formInput}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                placeholder="6+ Character"
              />
              {errors.password && touched.password ? (
                <Text>{errors.password}</Text>
              ) : null}
            </View>

            <View style={styles.formContainer}>
              <TouchableOpacity
                style={styles.formButton}
                onPress={handleSubmit}
              >
                <Text style={styles.textButton}>Sign In</Text>
              </TouchableOpacity>

              <Text style={styles.textRegister}>
                Don't have an account?{` `}
                <Link style={styles.linkRegister} href="./register">
                  Sign up for free
                </Link>
              </Text>
            </View>

            <Text style={styles.textRegister}>Or Login with :</Text>

            <View>
              <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={onGoogleButtonPress}
                marginTop={5}
                width={"100%"}
              />
            </View>
          </>
        )}
      </Formik>

      <ModalPopup visible={isModalVisible}>
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
                Horrraayyyyyy Login Successed 👌👍
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
