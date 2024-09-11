import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder, postOrder, setStateByName } from "@/redux/reducer/order/orderSlice";
import { selectCarDetails } from "@/redux/reducer/car/carDetailsSlice";
import CarList from "@/components/CarList";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { Row } from "@/components/Grid";
import {selectUser} from "../../../redux/reducer/auth/loginSlice"

// import { selectUser } from "@redux/reducer/auth/loginSlice"

import moment from "moment";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const paymentMethod = ["BCA", "BNI", "Mandiri"];

export default function step1({  }) {

  const carDetails = useSelector(selectCarDetails);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const { status, errorMessage } = useSelector(selectOrder);
  // const { data } = useSelector(selectCarDetails);
  const user  = useSelector(selectUser);


  const dispatch = useDispatch()

  const handleOrder = () => {
    const formData = {
      carId: carDetails.data.id,
      startRentAt: moment().format("YYYY-MM-DD"),
      finishRentAt: moment().add(2, "days").format("YYYY-MM-DD"),
    }
  
    dispatch(postOrder({token:user.data.access_token, formData}))
  }

  useEffect(() => {
    if(status === "success"){
      dispatch(setStateByName({name: "activeStep", value: 1}));
    }
    else {
      console.log(errorMessage)
    }
  }, [status])


  const formatIDR = useCallback((price) => formatCurrency.format(price), []);

    // Fungsi untuk mengelola pilihan bank
    const handleSelectMethod = (method) => {
      // Jika bank yang sama dipilih dua kali, batalkan pilihan (set ke null)
      if (selectedMethod === method) {
        setSelectedMethod(null);
      } else {
        setSelectedMethod(method);
      }
    };

  return (
    <View style={styles.container}>

      <CarList
        image={{ uri: carDetails.data.image }}
        carName={carDetails.data.name}
        passengers={5}
        baggage={4}
        price={carDetails.data.price}
      />
      <Text style={styles.textBold}>Pilih Bank Transfer</Text>
      <Text style={styles.textBold}>
        Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau
        Mobile Banking
      </Text>

      <View>
        {paymentMethod.map((e) => (
          <TouchableOpacity
            key={e}
            style={styles.paymentMethod}
            onPress={() => handleSelectMethod(e)}
          >
            <Text style={styles.paymentBox}>{e}</Text>
            <Text style={styles.paymentText}>{e} Transfer</Text>
            {selectedMethod === e && (
              <Ionicons style={styles.check} size={20} name={"checkmark"} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View>
        <Text style={styles.textBold}>% Pakai Kode Promo</Text>

        <Row style={styles.promosForm}>
          <TextInput
            style={styles.promoInput}
            placeholder="Tulis promomu disini"
          />

          <Button
            style={styles.promoButton}
            title={"Terapkan"}
            color="#3D7B3F"
          />
        </Row>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>{formatIDR(carDetails.data.price || 0)}</Text>
        <TouchableOpacity
          style={[styles.formButton,
          selectedMethod === null && styles.formButtonDisabled,
          ]}
          disabled={selectedMethod === null ? true : false}
          onPress={handleOrder}
        >
          <Text style={styles.textPayment}>Bayar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  textBold: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },

  paymentMethod: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    borderWidthBottom: 1,
    borderColorBottom: "#D0D0D0",
    borderRadius: 5,
  },

  paymentBox: {
    width: "30%",
    textAlign: "center",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "#D0D0D0",
    marginRight: 20,
    borderRadius: 5,
  },

  check: {
    marginLeft: "auto",
    marginVertical: 5,
    color: "green",
  },

  paymentText: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: "#000000",
    marginTop: 10,
  },

  price: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 10,
  },

  promoText: {
    fontFamily: "Poppinsbold",
    fontSize: 14,
  },

  textPayment: {
    fontFamily: "PoppinsBold",
    color: "#ffffff",
    textAlign: "center",
  },

  promoInput: {
    borderWidth: 1,
    padding: 10,
    width: "70%",
  },

  promoButton: {
    fontFamily: "PoppinsBold",
    width: "25%",
    borderWidth: 1,
    borderColor: "3D7B3F",
  },

  promosForm: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  footer: {
    backgroundColor: "#eeeeee",
    marginTop: 20,
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
  },

  formButton: {
    backgroundColor: "#3D7B3F",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },

  formButtonDisabled: {
    backgroundColor: "#C9E7CA",
  },
});
