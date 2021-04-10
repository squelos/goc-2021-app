import React, {useState} from 'react'
import {Text, View} from "native-base";
import {Dimensions, Image, TouchableOpacity} from "react-native";
import PicturePicker from "./component/picture-picker.component";
import {commonStyle} from "../../shared/styles/common.style";
import ButtonZen from "../../shared/component/button/button.component";
import Overlay from "./component/overlay.component";
import ViewShot from "react-native-view-shot";
import {useDispatch} from "react-redux";
import {onUpdateImage} from "../../shared/store/action/snap.action";
import RNFS from 'react-native-fs'

const ScreenShare = () => {
    const width = Dimensions.get('window').width

    const [locationX, setLocationX] = useState(0);
    const [locationY, setLocationY] = useState(0);
    const [isPress, setIsPress] = useState(false);
    const dispatch = useDispatch();
    // const onCapture = useCallback(uri => {
    //     console.log(isPress)
    //     if (uri) {
    //         dispatch(onUpdateImage({uri}));
    //         setIsPress(false)
    //     }
    // }, []);

    return (<View style={{flex: 1}}>
        <View style={{flex: 1}}>
            <View style={{borderBottomLeftRadius: 25, borderBottomRightRadius: 25, position: 'absolute'}}>
                <ViewShot ref={ref => this.viewShot = ref} options={{quality: 0.9,}}>
                    <Image source={{uri: 'https://www.mandysam.com/img/random.jpg'}}
                           style={{height: 450, width, borderBottomLeftRadius: 25, borderBottomRightRadius: 25}}/>
                    {isPress && <Overlay position={{
                        top: parseFloat(locationY - 40),
                        left: parseFloat(locationX - 35)
                    }}/>}
                </ViewShot>
            </View>
            <View style={{borderBottomLeftRadius: 25, borderBottomRightRadius: 25}}>
                <TouchableOpacity onPress={(ev) => {
                    setLocationX(ev.nativeEvent.locationX);
                    setLocationY(ev.nativeEvent.locationY);
                    this.viewShot.capture().then(uri => {
                        RNFS.readFile(uri, 'base64').then(res => {
                            let urlString = 'data:image/jpeg;base64,' + res;
                            dispatch(onUpdateImage({uri: urlString}))
                        })
                        console.log(uri)
                    })
                    setIsPress(true)
                }}>
                    <Image source={{uri: 'https://www.mandysam.com/img/random.jpg'}}
                           style={{height: 450, width, borderBottomLeftRadius: 25, borderBottomRightRadius: 25}}/>
                </TouchableOpacity>
            </View>
            <View style={{top: -48}}>
                <PicturePicker isPress={isPress}/>
                <View style={{marginTop: 32}}>
                    <ButtonZen title="Finaliser mon dossier" color={commonStyle.purpleColor}/>
                </View>
            </View>
        </View>
    </View>)
}

export default ScreenShare
