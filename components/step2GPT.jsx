import { View, Text, StyleSheet, TouchableOpacity, Alert, Pressable, Image } from "react-native";
import { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectOrder, selectPaymentMethod } from "@/redux/reducer/order/orderSlice";
import { selectCarDetails } from "@/redux/reducer/car/carDetailsSlice";
import CarList from "@/components/CarList";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { Row } from "@/components/Grid";
import CountDown from "react-native-countdown-component-maintained";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import ModalPopup from "@/components/Modal";

function getData24() {
  const date24 = new Date(); // Mengambil waktu 24 jam dari sekarang
  date24.setHours(date24.getHours() + 24);
  return date24.toString();
}

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function Step2({ setActiveStep }) {
  const { carId } = useSelector(selectOrder);
  const { data } = useSelector(selectCarDetails);
  const selectedMethod = useSelector(selectPaymentMethod); // Mengambil pilihan bank dari Redux
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);

  const formatIDR = useCallback((price) => formatCurrency.format(price), []);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text.toString());
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const bankDetails = {
    BCA: {
      name: "BCA",
      accountNumber: "1234-5678-9000",
      accountHolder: "Jeep Bromo Online",
    },
    BNI: {
      name: "BNI",
      accountNumber: "9876-5432-1000",
      accountHolder: "Jeep Bromo Online",
    },
    Mandiri: {
      name: "Mandiri",
      accountNumber: "1122-3344-5566",
      accountHolder: "Jeep Bromo Online",
    },
  };

  const currentBank = bankDetails[selectedMethod] || {};

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Countdown Timer */}
        <Row style={styles.countDownWrapper}>
          <Text style={styles.countDownText}>Selesaikan Pembayaran Sebelum</Text>
          <CountDown
            until={86400}
            digitStyle={{ backgroundColor: "#FA2C5A" }}
            digitTxtStyle={{ color: "#fff" }}
            timeLabelStyle={{ display: "none" }}
            onFinish={() => Alert("Waktu habis!")}
            timeToShow={["H", "M", "S"]}
            size={12}
            showSeparator={true}
          />
        </Row>

        <Text style={styles.countDownDate}>{getData24()}</Text>

        {/* Car Details */}
        <CarList
          image={{ uri: data.image }}
          carName={data.name}
          passengers={5}
          baggage={4}
          price={data.price}
        />

        <Text style={styles.textBold}>Lakukan Transfer Ke :</Text>

        {/* Bank Transfer Details */}
        <View>
          <Button style={styles.paymentMethod}>
            <Text style={styles.paymentBox}>{currentBank.name}</Text>
            <Text style={styles.paymentText}>
              {currentBank.name} Transfer a.n {currentBank.accountHolder}
            </Text>
          </Button>
        </View>

        {/* Account Number */}
        <View style={styles.rekContainer}>
          <Text>Nomor Rekening</Text>
          <Row style={styles.boxRek}>
            <Text>{currentBank.accountNumber}</Text>
            <TouchableOpacity onPress={() => copyToClipboard(currentBank.accountNumber)}>
              <Ionicons color={"#3C3C3C"} name={"copy-outline"} size={18} />
            </TouchableOpacity>
          </Row>
        </View>

        {/* Total Payment */}
        <View style={styles.rekContainer}>
          <Text>Total Bayar</Text>
          <Row style={styles.boxRek}>
            <Text>{formatIDR(data.price)}</Text>
            <TouchableOpacity onPress={() => copyToClipboard(data.price)}>
              <Ionicons color={"#3C3C3C"} name={"copy-outline"} size={18} />
            </TouchableOpacity>
          </Row>
        </View>

        {/* Payment Confirmation */}
        <View>
          <Text style={styles.textBold}>
            Klik konfirmasi pembayaran untuk mempercepat proses pengecekan
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.formButton1}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textPayment1}>Konfirmasi Pembayaran</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.formButton2}
            onPress={() => setActiveStep(2)}
          >
            <Text style={styles.textPayment2}>Lihat Daftar Pesanan</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal Popup */}
      <ModalPopup visible={modalVisible}>
        <View style={styles.modalBackground}>
          <Text style={styles.textBold}>Konfirmasi Pembayaran</Text>
          <Text style={styles.textBold}>
            Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu
            akan segera kami cek tunggu kurang lebih 10 menit untuk mendapatkan
            konfirmasi.
          </Text>

          <CountDown
            until={600} // Countdown untuk 10 menit
            digitStyle={{ backgroundColor: "#FA2C5A" }}
            digitTxtStyle={{ color: "#fff" }}
            timeLabelStyle={{ display: "none" }}
            onFinish={() => Alert("Konfirmasi selesai!")}
            timeToShow={["M", "S"]}
            size={12}
            showSeparator={true}
          />

          <Text style={styles.textBold}>Upload Bukti Pembayaran</Text>
          <Text style={styles.textBold}>
            Untuk membantu kami lebih cepat melakukan pengecekan. Kamu bisa
            upload bukti bayarmu
          </Text>

          <Pressable style={styles.uploadImage} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Ionicons color={"#3C3C3C"} name={"image-outline"} size={18} />
            )}
          </Pressable>

          <View style={styles.footerModal}>
            <TouchableOpacity
              style={styles.formButton1}
              onPress={() => {
                setModalVisible(false);
                setActiveStep(2);
              }}
            >
              <Text style={styles.textPayment1}>Upload</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.formButton2}
              onPress={() => setActiveStep(2)}
            >
              <Text style={styles.textPayment2}>Lihat Daftar Pesanan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopup>
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
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#D0D0D0",
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
  },
  paymentText: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: "#000",
    margin
