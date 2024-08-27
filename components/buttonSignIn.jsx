import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function buttonSignIn(props) {
    const { onPress, title = 'Sign In' } = props;
    return (
        <Pressable style={styles.buttonSignIn} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonSignIn: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#3D7B3F',
    },
    text: {
      fontSize: 14,
      fontFamily: 'PoppinsBold',
      color: '#ffffff',
    },
  });