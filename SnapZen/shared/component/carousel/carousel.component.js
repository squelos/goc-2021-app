import {Text, View} from 'native-base';
import Carousel from 'react-native-snap-carousel';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image} from "react-native";
import PaginationDot from "react-native-snap-carousel/src/pagination/PaginationDot";
const win = Dimensions.get('window');

const CarouselPagination = ({images}) => {
    return (<View style={{borderRadius: 20,borderWidth: 16, borderColor: 'white', overflow: 'hidden'}} >
            <Image source={images[0]} style={{height: 311}} resizeMode="cover" />
    </View>)
}

export default CarouselPagination
