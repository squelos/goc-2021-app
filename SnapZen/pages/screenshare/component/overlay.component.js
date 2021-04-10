import React from 'react'
import {View} from "native-base";

const Overlay = ({position}) => {
    return (
        <View style={[{height: 70,
            width: 70,
            marginTop: 5,
            borderWidth: 3,
            borderRadius: 50,
            position: 'absolute',
            borderColor: 'white' ,
        }, position]}>
        </View>)
}

export default Overlay
