import React from 'react'
import {Text, View} from "native-base";
import {commonStyle} from "../../../shared/styles/common.style";
import CarouselPagination from "../../../shared/component/carousel/carousel.component";
import {useSelector} from "react-redux";

const PicturePicker = ({isPress}) => {
    const snap = useSelector(state => state.snap)
    return (
        <View style={{paddingHorizontal: 24}}>
            <View style={{backgroundColor: 'white', borderRadius: 25}}>
                <CarouselPagination images={snap.images}/>
                {/*<View style={{backgroundColor: commonStyle.softBlueColor, padding: 24, overflow: 'hidden'}}>*/}
                    {/*<View><Text style={{textAlign: 'center', paddingHorizontal: 40, fontSize: 21, lineHeight: 32}}>Prêt à*/}
                    {/*    prendre votre première photo ?</Text>*/}
                    {/* <Text style={{fontSize: 16, lineHeight: 20, textAlign: 'center', paddingHorizontal: 8, marginTop: 32}}>Taper sur la*/}
                    {/*    vidéo pour indiquer la zone que vous souhaitez enregistrer</Text></View>*/}
                {/*</View>*/}
            </View>
        </View>)
}


export default PicturePicker
