import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectOrder, setPaymentMethod } from "@/redux/reducer/order/orderSlice";       // Import Redux
import { selectCarDetails } from "@/redux/reducer/car/carDetailsSlice";
import CarList from "@/components/CarList";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { Row } from "@/components/Grid";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const paymentMethod = ["BCA", "BNI", "Mandiri"];

export default function Step1({ setActiveStep }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const { carId } = useSelector(selectOrder);
  const { data } = useSelector(selectCarDetails);
  const dispatch = useDispatch(); // Dispatch untuk Redux
  const formatIDR = useCallback((price) => formatCurrency.format(price), []);

  // Fungsi untuk mengelola pilihan bank
  const handleSelectMethod = (method) => {
    if (selectedMethod === method) {
      setSelectedMethod(null); // Batalkan pilihan jika dipilih lagi
    } else {
      setSelectedMethod(method); // Pilih metode pembayaran
    }
  };

  return (
    <View style={styles.container}>
      {/* Komponen Mobil */}
      <CarList
        image={{ uri: data.image }}
        carName={data.name}
        passengers={5}
        baggage={4}
        price={data.price}
      />

      {/* Pilihan Bank */}
      <Text style={styles.textBold}>Pilih Bank Transfer</Text>
      <Text style={styles.textBold}>
        Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau Mobile Banking
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

      {/* Input Promo */}
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

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.price}>{formatIDR(data.price || 0)}</Text>
        <TouchableOpacity
          style={[
            styles.formButton,
            selectedMethod === null && styles.formButtonDisabled,
          ]}
          disabled={!selectedMethod} // Hanya aktif jika ada bank yang dipilih
          onPress={() => {
            dispatch(setPaymentMethod(selectedMethod)); // Simpan pilihan bank ke Redux
            setActiveStep(2); // Lanjut ke step 2
          }}
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
    backgroundColor: "#B0B0B0",
  },
});
