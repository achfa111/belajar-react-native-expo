import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ProgressStep, ProgressSteps } from "react-native-progress-stepper";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Row, Col } from "@/components/Grid";
import { useSelector } from "react-redux";
import { selectOrder } from "@/redux/reducer/order/orderSlice";
import moment from "moment";

export default function index() {
  const {activeStep} = useSelector(selectOrder);


  return (
    <View style={{ flex: 1 }}>

      <Row>
        <TouchableOpacity
          style={styles.formIcon}
          onPress={() => router.navigate("../(tabs)/(listcar)")}
        >
          <Ionicons size={17} name={"arrow-back-outline"} color={"#000000"} />
        </TouchableOpacity>

        <Text style={styles.textCursor}>Pembayaran</Text>
      </Row>

      <ProgressSteps activeStep={activeStep}>
        <ProgressStep label="Pilih Metode Pembayaran" removeBtnRow={true}>
          <Step1/>
        </ProgressStep>

        <ProgressStep label="Bayar" removeBtnRow={true}>
          <Step2/>
        </ProgressStep>

        <ProgressStep label="Tiket" removeBtnRow={true}>
          <Step3/>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}

const styles = StyleSheet.create({
  formIcon: {
    justifyContent: "left",
    marginLeft: 20,
    marginTop: 10
  },

  textCursor: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginLeft: 10,
    
  }
});
