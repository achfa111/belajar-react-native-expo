import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ParallaxFlatList from "@/components/ParallaxFlatList";
import Constants from "expo-constants";
import { Col, Row } from "../../components/Grid";
import ButtonIcon from "../../components/ButtonIcon";
import CarList from "../../components/CarList";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Geolocation from "../../components/Geolocation"

import { useSelector, useDispatch } from "react-redux";             // add import for redux & store
import { getCar, selectCar } from "@/redux/reducer/car/carSlice";   // add import for redux & store

function getUser() {
  return SecureStore.getItem("user");
}

export default function HomeScreen() {
  const { data, isLoading } = useSelector(selectCar);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();     // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal;             // UseEffect cleanup

    dispatch(getCar(signal));

    return () => {
      // cancel request sebelum component di close
      controller.abort();
    };
  }, []);

  return (
    <ParallaxFlatList
      headerBackgroundColor={{ light: "#A43333", dark: "#A43333" }}
      headerImage={
        <View style={styles.container}>
          <View>
            <Text style={styles.titleText}>Hi, (your_name)</Text>
            <Geolocation/>
          </View>
          <View>
            <Image
              style={styles.imageProfile}
              source={require("@/assets/images/orang24.png")}
            />
          </View>
        </View>
      }
      banner={
        <>
          <View style={styles.banner}>
            <View style={styles.bannerContainer}>
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerText}>
                  Sewa Mobil Berkualitas di kawasanmu
                </Text>
                <TouchableOpacity style={styles.formButton} onPress={() => router.navigate("/(listcar)")}>
                  <Text style={styles.textButton}>Sewa Mobil</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Image source={require("@/assets/images/img_car.png")} />
              </View>
            </View>
          </View>
          <View>
            <Row justifyContent={"space-between"}>
              <Col>
                <ButtonIcon
                  text={"Sewa Mobil"}
                  name={"car-outline"}
                  color={"#ffffff"}
                />
              </Col>
              <Col>
                <ButtonIcon
                  text={"Oleh-Oleh"}
                  name={"cube-outline"}
                  color={"#ffffff"}
                />
              </Col>
              <Col>
                <ButtonIcon
                  text={"Penginapan"}
                  name={"key-outline"}
                  color={"#ffffff"}
                />
              </Col>
              <Col>
                <ButtonIcon
                  text={"Wisata"}
                  name={"camera-outline"}
                  color={"#ffffff"}
                />
              </Col>
            </Row>
          </View>

          <Text style={styles.newText}>Daftar Mobil Pilihan</Text>
        </>
      }
      loading={isLoading}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CarList
          style={{ marginHorizontal: 20 }}
          key={item.id}
          image={{ uri: item.image }}
          carName={item.name}
          passengers={5}
          baggage={4}
          price={item.price}
          onPress={() => router.navigate("(listcar)/details/" + item.id)}
        />
      )}
      viewabilityConfig={{
        waitForInteraction: true,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  newText: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    marginTop: 10,
  },

  titleText: {
    color: "#ffffff",
    fontFamily: "PoppinsBold",
  },
  imageProfile: {
    height: 35,
    width: 35,
  },
  banner: {
    backgroundColor: "#AF392F",
    marginTop: -90,
    overflow: "hidden",
    borderRadius: 5,
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bannerTextContainer: {
    width: "45%",
    padding: 15,
  },
  bannerText: {
    color: "#ffffff",
    fontFamily: "Poppins",
    fontSize: 16,
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
    fontSize: 14,
  },

});
