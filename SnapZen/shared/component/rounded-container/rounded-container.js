import React from 'react'
import {Text, View} from "native-base";
import {StyleSheet, TextInput} from "react-native";

const RoundedContainer = ({pin, onSetPin, isSetInput}) => {

    const renderInput = isSetInput ? <TextInput placeholder={"_ _ _ _"} style={roundedStyle.text} onChangeText={(text) => onSetPin(text)} underlineColorAndroid="transparent"/> :
        <Text style={roundedStyle.text}>{pin}</Text>;

    return (<View style={roundedStyle.container}>
        <View style={roundedStyle.rounded}>
            {renderInput}
        </View>
    </View>)
}

const roundedStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 36,
    },
    rounded: {
        backgroundColor: 'white',
        padding: 32,
        borderRadius: 32,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: "#000",
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
