import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Colors } from '@/constants/Colors'


export default function buttonSignIn(props) {
    return (

        <TouchableOpacity style={styles.newButton}>
            <Link style={styles.newButtonLink}
                href={props.link}>
                {props.name}
            </Link>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    newButton: {
        borderRadius: 10,
        backGroundColor: Colors.light.button,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },

    newButtonLink: {
        fontSize: 14,
        lineHeight: 25,
        fontFamily: 'PoppinsBold',
        color: 'white',
        padding: 5,
        width: '100%',
        textAlign: 'center',
    }

})