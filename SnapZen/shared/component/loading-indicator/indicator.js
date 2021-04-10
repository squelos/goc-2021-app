import React from 'react'
import {MaterialIndicator} from "react-native-indicators";
import {commonStyle, shadowStyle} from "../../styles/common.style";
import {Text, View} from "native-base";

const Indicator = () => {
    return (<View style={[shadowStyle, {
        borderRadius: 113,
        backgroundColor: 'white',
        width: 226,
        height: 226,
        alignSelf: 'center'
    }]}>
            <MaterialIndicator size={160} color={commonStyle.purpleColor}/>
            <View style={{position: 'absolute', top: 80, left: 0, paddingHorizontal: 40}}>
                <View style={{paddingHorizontal: 40}}>
                    <Text style={{fontSize: 12, alignSelf: 'center', textAlign: 'center', lineHeight: 20}}>en attente de
                        connexion</Text>
                </View>
            </View>
    </View>)
}

export default Indicator
