import { View, Text, Image, TextInput, Button, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


export default function Login() {
    return (
        <View>
            <Image
                style={styles.logo}
                source={require('@/assets/images/LogoTMMIN.png')} />

            <Text style={styles.heading}>Sign Up</Text>

            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Name*</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder='Full Name'
                />
            </View>


            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Email*</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder='Contoh: johndee@gmail.com'
                />
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Create Password</Text>
                <TextInput
                    style={styles.formInput}
                    secureTextEntry={true}
                    placeholder='6+ karakter'
                />
            </View>

            <View style={styles.formContainer}>
                <Button
                    color='#3D7B3F'
                    title="Sign Up"
                    borderRadius="2" />

                <Text
                    style={styles.textRegister}>Already have an account?
                    <Link style={styles.linkRegister} href="/index"> Sign In here</Link> </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    logo: {
        marginVertical: 20,
        marginHorizontal: 20,
    },

    heading: {
        fontSize: 40,
        fontFamily: 'PoppinsBold',
        textAlign: 'center',
        marginVertical: 40,
    },

    formContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },

    formLabel: {
        fontFamily: 'PoppinsBold',
        fontSize: 14
    },

    formInput: {
        borderWidth: 1,
        borderRadius: 1,
        padding: 10,
    },

    textRegister: {
        marginTop: 10,
        textAlign: 'center',
    },

    linkRegister: {
        color: '#0D28A6',
        textDecorationLine: 'underline',
    },

});