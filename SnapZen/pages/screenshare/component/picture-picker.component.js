import React from 'react'
import {Text, View} from "native-base";
import {commonStyle} from "../../../shared/styles/common.style";
import CarouselPagination from "../../../shared/component/carousel/carousel.component";
import {useSelector} from "react-redux";

const PicturePicker = ({isPress}) => {
    const snap = useSelector(state => state.snap)
    return (
        <View style={{paddingHorizontal: 24}}>
                {snap.images.length > 0 && <CarouselPagination images={snap.images}/>}
                {snap.images.length === 0 &&
                <View style={{padding: 24, alignSelf: 'center'}}>
                    <View style={{backgroundColor: commonStyle.softBlueColor, paddingHorizontal: 16, width: 340, height: 310, borderRadius: 25, borderWidth: 16, borderColor: 'white'}}>
                        <Text style={{textAlign: 'center', paddingHorizontal: 40, fontSize: 21, lineHeight: 32, marginTop: 16}}>Prêt à
                            prendre votre première photo ?</Text>
                        <Text style={{
                            fontSize: 16,
                            lineHeight: 20,
                            textAlign: 'center',
                            paddingHorizontal: 8,
                            marginTop: 32
                        }}>Taper sur la
                            vidéo pour indiquer la zone que vous souhaitez enregistrer</Text>
                    </View>
                </View>}
        </View>)
}


export default PicturePicker
