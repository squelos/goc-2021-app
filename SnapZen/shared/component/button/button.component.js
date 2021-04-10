import React from "react";
import {buttonStyle} from "../../styles/common.style";
import {Button, Text, View} from "native-base";

const ButtonZen = ({title, onPress, color}) => {
    return (<View style={{paddingHorizontal: 24}}>
        <Button style={buttonStyle(color)}>
            <Text style={{color: 'white', fontSize: 14}}
            >{title}</Text>
        </Button>
    </View>)
}

export default ButtonZen
