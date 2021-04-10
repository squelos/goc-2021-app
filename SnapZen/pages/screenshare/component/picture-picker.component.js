import React from 'react'
import {Text, View} from "native-base";
import {commonStyle} from "../../../shared/styles/common.style";

const PicturePicker = () => {
    return (
        <View style={{paddingHorizontal: 24}}>
            <View style={{backgroundColor: 'white', padding: 16, borderRadius: 25}}>
                <View style={{backgroundColor: commonStyle.softBlueColor, padding: 24}}>
                    <Text style={{textAlign: 'center', paddingHorizontal: 40, fontSize: 21, lineHeight: 32}}>Prêt à
                        prendre votre première photo ?</Text>
                    <Text style={{fontSize: 16, lineHeight: 20, textAlign: 'center', paddingHorizontal: 8, marginTop: 32}}>Taper sur la
                        vidéo pour indiquer la zone que vous souhaitez enregistrer</Text>
                </View>
            </View>
        </View>)
}

export default PicturePicker
