import {Text, View} from 'native-base';
import React from 'react';
import {Dimensions, Image, StyleSheet} from "react-native";

const win = Dimensions.get('window');
import {SwiperFlatList} from "react-native-swiper-flatlist/index";

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

const CarouselPagination = ({images}) => {
    return (<View style={{borderRadius: 25, borderWidth: 16, borderColor: 'white', overflow: 'hidden'}}>
        <View>
            <SwiperFlatList
                autoplay
                autoplayDelay={2}
                autoplayLoop={false}
                style={{height: 311}}
                showPagination
                data={images}
                renderItem={({item}) => (
                    <View style={styles.child}>
                        <Image source={item} style={{height: 311}} resizeMode="cover"/>
                    </View>
                )}/>
        </View>
    </View>)
}

export default CarouselPagination
const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: 'white'},
    child: {width: win.width, justifyContent: 'center'},
    text: {fontSize: win.width * 0.5, textAlign: 'center'},
});
