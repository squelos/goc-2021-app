import React, {useCallback, useEffect, useState} from 'react'
import {Text, View} from "native-base";
import {Dimensions, Image, StatusBar, TouchableOpacity} from "react-native";
import PicturePicker from "./component/picture-picker.component";
import {commonStyle} from "../../shared/styles/common.style";
import ButtonZen from "../../shared/component/button/button.component";
import Overlay from "./component/overlay.component";
import ViewShot from "react-native-view-shot";
import {useDispatch} from "react-redux";
import {onUpdateImage} from "../../shared/store/action/snap.action";
import RNFS from 'react-native-fs'
import Rtc from "../../shared/component/web-rtc/web-rtc.component";
import {useNavigation, useRoute} from "@react-navigation/native";
import {Rtctest} from "../../shared/component/web-rtc/rtc-test.component";
const ScreenShare = () => {
    const width = Dimensions.get('window').width
    const {params} = useRoute()

    const [locationX, setLocationX] = useState(0);
    const [locationY, setLocationY] = useState(0);
    const [isPress, setIsPress] = useState(false);
    const dispatch = useDispatch();
    const onCapture = useCallback(uri => {
        if (uri && locationY !== 0 && locationX !== 0) {
            RNFS.readFile(uri, 'base64').then(res => {
                let urlString = 'data:image/jpeg;base64,' + res;
                dispatch(onUpdateImage({uri: urlString}))
            })
        }
    }, [isPress, locationX, locationY]);

    return (<View style={{flex: 1}}>
        <StatusBar barStyle="light-content"/>
        {/*<View style={{flex: 1}}>*/}
        {/*    <View style={{borderBottomLeftRadius: 25, borderBottomRightRadius: 25}}>*/}
        {/*        <ViewShot options={{quality: 0.9}} captureMode="update"*/}
        {/*                  onCapture={onCapture}>*/}
        {/*            <TouchableOpacity onPress={async (ev) => {*/}
        {/*                ev.preventDefault();*/}
        {/*                setLocationX(ev.nativeEvent.locationX);*/}
        {/*                setLocationY(ev.nativeEvent.locationY);*/}
        {/*                setIsPress(true)*/}
        {/*            }}>*/}
        {/*<Rtc user={params.user}/>*/}
        {/*<Image source={{uri: 'https://www.mandysam.com/img/random.jpg'}}*/}
        {/*       style={{height: 450, width, borderBottomLeftRadius: 25, borderBottomRightRadius: 25}}/>*/}
        {/*            {isPress && <Overlay position={{*/}
        {/*                top: parseFloat(locationY - 40),*/}
        {/*                left: parseFloat(locationX - 35)*/}
        {/*            }}/>}*/}
        {/*        </TouchableOpacity>*/}
        {/*    </ViewShot>*/}
        {/*</View>*/}
        {/*<View style={{top: -48}}>*/}
            {/*<PicturePicker isPress={isPress}/>*/}
            {/*<View style={{marginTop: 350}}>*/}
            {/*    <ButtonZen title="Finaliser mon dossier" color={commonStyle.purpleColor}/>*/}
            {/*</View>*/}
            {/*</View>*/}
        {/*</View>*/}
        <View style={{flex: 1}}>
            <Rtctest />
        </View>
    </View>)
}

export default ScreenShare
