import React, {useState} from 'react'
import {Text, View} from "native-base";
import {Dimensions, Image, PanResponder, TouchableOpacity} from "react-native";
import PicturePicker from "./component/picture-picker.component";
import {commonStyle} from "../../shared/styles/common.style";
import ButtonZen from "../../shared/component/button/button.component";

const ScreenShare = () => {
    const width = Dimensions.get('window').width

    const [locationX, setLocationX] = useState(0);
    const [locationY, setLocationY] = useState(0);

    return (<View style={{flex: 1}}>
        <View style={{flex: 1}}>
            <View style={{borderBottomLeftRadius: 25, borderBottomRightRadius: 25}}>
                <TouchableOpacity onPress={(ev) => {
                    setLocationX(ev.nativeEvent.locationX);
                    setLocationY(ev.nativeEvent.locationY);
                }}>
                    <Image source={{uri: 'https://www.mandysam.com/img/random.jpg'}}
                           style={{height: 450, width, borderBottomLeftRadius: 25, borderBottomRightRadius: 25}}/>

                    <Text
                        style={[{
                            height: 22,
                            width: 22,
                            marginTop: 5,
                            position: 'absolute',
                            borderRadius: 14,
                            backgroundColor: '#00FF30',
                        },
                            {
                                top: parseFloat(locationY - 15),
                                left: parseFloat(locationX - 10),
                                position: 'absolute'
                            },
                        ]}>
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{top: -40}}>
                <PicturePicker/>
            </View>
            <View>
                <ButtonZen title="Finaliser mon dossier" color={commonStyle.purpleColor}/>
            </View>
        </View>
    </View>)
}

export default ScreenShare
