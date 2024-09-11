import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect } from "react";

import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

import { Row } from "@/components/Grid";

import { useSelector, useDispatch } from "react-redux"; // add import for redux & store
import {
  getCarDetails,
  selectCarDetails,
} from "@/redux/reducer/car/carDetailsSlice"; // add import for redux & store

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function details() {
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useSelector(selectCarDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup

    dispatch(getCarDetails({ id, signal }));

    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <View style={styles.container}>

      <View>

        <TouchableOpacity style={styles.formIcon} onPress={() => router.navigate("/(listcar)")}>
          <Ionicons size={17} name={"arrow-back-outline"} color={"#000000"} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text>{data.name}</Text>
        </View>

        <View style={styles.textIcon}>
          <Row gap={15}>
            <Row>
              <Ionicons size={14} name={"people-outline"} color={"#8A8A8A"} />
              <Text style={styles.capacityText}> 5</Text>
            </Row>
            <Row>
              <Ionicons size={14} name={"bag-outline"} color={"#8A8A8A"} />
              <Text style={styles.capacityText}> 4</Text>
            </Row>
          </Row>
        </View>

        <View style={styles.imgContainer}>
          <Image source={{ uri: data.image }} width={250} height={150} />
        </View>

        <ScrollView style={styles.colContainer}>

          <View style={styles.card}>
            <View>
              <Text style={styles.titleText}>Tentang Paket</Text>
            </View>

            <View>
              <Text style={styles.titleText}>Include</Text>
            </View>
            <Text style={styles.listText}>{"\u2022"} Apa saja yang termasuk dalam paket misal durasi max 12 jam</Text>
            <Text style={styles.listText}>{"\u2022"} Sudah termasuk bensin selama 12 jam</Text>
            <Text style={styles.listText}>{"\u2022"} Sudah termasuk Tiket Wisata</Text>
            <Text style={styles.listText}>{"\u2022"} Sudah termasuk pajak</Text>

            <View>
              <Text style={styles.titleText}>Exclude</Text>
            </View>
            <Text style={styles.listText}>{"\u2022"} Tidak termasuk biaya makan sopir Rp 75.000/hari</Text>
            <Text style={styles.listText}>{"\u2022"} Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam</Text>
            <Text style={styles.listText}>{"\u2022"} Tidak termasuk akomodasi penginapan</Text>
          </View>

        </ScrollView>

      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>{formatCurrency.format(data.price)}</Text>

        <TouchableOpacity style={styles.formButton} onPress={() => {
            router.navigate('(order)')
            }}>
          <Text style={styles.textButton}>Lanjutkan Pembayaran</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },

  formIcon: {
    marginLeft: 10,
    marginTop: 10,
  },

  textContainer: {
    alignItems: "center",
    marginBottom: 0,
  },

  imgContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  colContainer: {
    paddingHorizontal: 20,
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
    color: "#8A8A8A",
    marginVertical: 5,
  },

  footer: {
    backgroundColor: "#eeeeee",
    position: "absolute",
    width: "100%",
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
    marginTop: 0,
    backgroundColor: "#fff",
  },

  textIcon: {
    alignItems: "center",
    marginTop: 10,
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
