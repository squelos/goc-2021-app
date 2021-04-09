import React from 'react'
import {Text, View} from "native-base";
import {StyleSheet} from "react-native";

const RoundedContainer = () => {
    return (<View style={roundedStyle.container}>
        <View style={roundedStyle.rounded}>
        <Text style={roundedStyle.text}>_ _ _ _</Text>
        </View>
    </View>)
}

const roundedStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 36,
    },
    rounded: {
        backgroundColor: 'white', shadowColor: "#000",
        padding: 32,
        borderRadius: 32,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    text: {
        fontSize: 32,
        textAlign: 'center'
    }
})

export default RoundedContainer
