import { View, Text, Image, Button, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


export default function Login() {
    return (
        <View>

            <Text style={styles.heading}>Akun</Text>

            <View alignItems="center">
                <Image
                    source={require('@/assets/images/AlluraPark1.png')} />
            </View>

            <Text style={styles.title}>Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di TMMIN Car Rental lebih mudah</Text>

            <View style={styles.formContainer}>
                <Button
                    color='#3D7B3F'
                    title="Register"
                    borderRadius="2" />
                    
            </View>

            <View style={styles.bawah}>
                <Image></Image>
                <Text>Tab [Home|Daftar Mobil|Akun]</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    heading: {
        fontSize: 14,
        fontFamily: 'PoppinsBold',
        marginVertical: 40,
        marginHorizontal: 20,
    },

    title: {
        fontSize: 14,
        fontFamily: 'PoppinsBold',
        textAlign: 'center',
        marginVertical: 40,
        marginHorizontal: 60,
    },

    formContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },

    bawah: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },


});