import { View, Text, ScrollView, Image, StyleSheet, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";

import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

// import { Row, Col } from 'expo-router';

import { useSelector, useDispatch } from "react-redux";                                       // add import for redux & store
import { getCarDetails, selectCarDetails } from '@/redux/reducer/car/carDetailsSlice';         // add import for redux & store

// const formatCurrency = new Intl.NumberFormat("id-ID", {
//   style: "currency",
//   currency: "IDR",
// });

export default function details() {
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useSelector(selectCarDetails)
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();       // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal;               // UseEffect cleanup

    dispatch(getCarDetails({id, signal}))

    // setLoading(true); //loading stater
    // const getData = async () => {
    //   try {
    //     const response = await fetch(
    //       "https://api-car-rental.binaracademy.org/customer/car/" + id,
    //       { signal: signal } // UseEffect cleanup
    //     );
    //     const body = await response.json();
    //     setCars(body);
    //   } catch (e) {
    //     console.log(e); // Error Handling
    //     if (err.name === "AbortError") {
    //       console.log("successfully aborted");
    //     } else {
    //       console.log(err);
    //     }
    //   }
    // };
    // getData();
    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.textContainer}>
          <Text>{data.name}</Text>
        </View>
      </View>

      <View style={styles.imgContainer}>
        <Image source={{ uri: data.image }} width={150} height={150} />
      </View>

      {/* <Row gap={15}>
        <Col style={styles.textIcon}>
          <Ionicons size={14} name={"people-outline"} color={"#8A8A8A"} />
          <Text style={styles.capacityText}>{passengers}</Text>
        </Col>
        <Col style={styles.textIcon}>
          <Ionicons size={14} name={"bag-outline"} color={"#8A8A8A"} />
          <Text style={styles.capacityText}>{baggage}</Text>
        </Col>
      </Row> */}

      <ScrollView style={styles.colContainer}>
        <View style={styles.card}>
          <View>
            <Text style={styles.titleText}>Tentang Paket</Text>
          </View>

          <View>
            <Text style={styles.titleText}>Include</Text>
          </View>

          <Text style={styles.listText}>
            <View>
              <Ionicons size={15} name={"caret-forward-outline"} color={"#8A8A8A"} />
              <Text>Apa saja yang termasuk dalam paket misal durasi max 12 jam</Text>
            </View>

            <View>
              <Ionicons size={15} name={"caret-forward-outline"} color={"#8A8A8A"} />
              <Text>Sudah termasuk bensin selama 12 jam</Text>
            </View>

            <View>
              <Ionicons size={15} name={"caret-forward-outline"} color={"#8A8A8A"} />
              <Text>Sudah termasuk Tiket Wisata</Text>
            </View>

            <View>
              <Ionicons size={15} name={"caret-forward-outline"} color={"#8A8A8A"} />
              <Text>Sudah termasuk pajak</Text>
            </View>
          </Text>

          <View>
            <Text style={styles.titleText}>Exclude</Text>
          </View>

          <Text style={styles.listText}>
            <Text>Tidak termasuk biaya makan sopir Rp 75.000/hari</Text>
            <Text>
              Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
              20.000/jam
            </Text>
            <Text>Tidak termasuk akomodasi penginapan</Text>
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.price}>{data.price}</Text>
        <Button color="#3D7B3F" title="Lanjutkan Pembayaran" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //   paddingTop: Constants.statusBarHeight + 10,
    flex: 1,
    backgroundColor: "#ffffff",
    // alignItems: "center",
  },

  textContainer: {
    paddingTop: Constants.statusBarHeight + 10,
    alignItems: "center",
    marginBottom: 50,
  },

  imgContainer: {
    height: 100,
    width: 100,
    marginBottom: 50,
    alignItems: "center",
    marginLeft: 140,
  },

  colContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
    shadowColor: "#000000",
    marginTop: 40,
  },

  price: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 10,
  },

  titleText: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    fontColor: "#000000",
  },

  listText: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    fontColor: "#8A8A8A",
    marginVertical: 20,
  },

  footer: {
    backgroundColor: "#eeeeee",
    position: "fixed",
    bottom: 0,
    padding: 20,
  },

  card: {
    shadowColor: "rgba(0,0,0,1)",
    // shadowOffset: {
    //     width: 0,
    //     height: 3,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 1.5,
    elevation: 2,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 20,
    marginTop: 20,
    backgroundColor: "#fff",
  },

  // textIcon: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   gap: 5,
  // },

});
