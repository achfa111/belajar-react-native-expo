import { View, Text, Image, TextInput, Button, StyleSheet } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'


export default function Login() {
    return (
        <View>
            <Image 
            style={styles.logo}
            source={require('@/assets/images/LogoTMMIN.png')} />

            <Text style={styles.heading}>Welcome Back!</Text>

            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Email</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder='Example: johndee@gmail.com'
                />
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Password</Text>
                <TextInput
                    style={styles.formInput}
                    secureTextEntry={true}
                    placeholder='6+ character'
                />
            </View>

            <View style={styles.formContainer}>
                
                <Button 
                onPress={() => router.navigate('../(tabs)')}
                color='#3D7B3F'
                title="Sign In" />

                <Text 
                style={styles.textRegister}>Don't have an account?
                <Link style={styles.linkRegister} href="./register"> Sign Up for free</Link> </Text>
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
        marginBottom: 30,
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