import React, {useEffect} from "react";
import {Button, Text, View} from "native-base";
import {buttonStyle, commonStyle} from "../../shared/styles/common.style";
import {UserTypeEnum} from "../../shared/enum/type-user.enum";
import {Alert, Image} from "react-native";
import images from "../../assets/images.registery";
import fetchUuid, {fetchSensitiveData} from "../../shared/services/api.service";
import * as secureStore from '../../shared/services/secure-store.service'
import {useDispatch} from "react-redux";
import {getData, hasUuid} from "../../shared/services/secure-store.service";
import {useNavigation} from "@react-navigation/native";


const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    useEffect(async () => {
        if (!await hasUuid()) {
            Alert.prompt('Bienvenue sur SnapZen', `C'est votre première connexion, Veuillez renseigné votre prénom`, [{
                text: "Annuler",
                onPress: () => null
            }
                , {
                    text: "Ok", onPress: async (name) => {
                        await secureStore.setData("name", name)
                    }
                }])
        }
    }, [])

    useEffect(async () => {
        !await hasUuid() ?
            dispatch(fetchUuid()) :
            dispatch(fetchSensitiveData(await getData('id'), await getData('name')))
    }, [])

    return (<View style={{flex: 1}}>
        <View style={{flex: 3, marginTop: 90}}>
            <Image source={images.LOGO} style={{height: 300, width: 300, alignSelf: 'center'}}
                   resizeMode="contain"/>
            <View style={{paddingHorizontal: 100, marginTop: 72}}>
                <Image source={images.WELCOME}/>
            </View>
            <View style={{paddingHorizontal: 48, marginTop: 32}}>
                <Text
                    style={{fontSize: 16, lineHeight: 20, alignSelf: 'center', textAlign: 'center'}}>
                    Déclarer un sinistre sans stress grâce à votre conseiller</Text>
            </View>
        </View>
        <View style={{flex: 1}}>
            <Text style={{alignSelf: "center", marginBottom: 24, color: commonStyle.purpleColor, fontSize: 12}}>Pour
                commencer,
                êtes vous ?</Text>
            <View style={{paddingHorizontal: 24, marginBottom: 16}}>
                <Button style={buttonStyle(commonStyle.purpleColor)}
                        onPress={() => navigation.navigate('AccessCode', {type: UserTypeEnum.USER})}>
                    <Text style={{color: 'white', fontSize: 14}}>un assuré SnapZen</Text>
                </Button>
            </View>
            <View style={{paddingHorizontal: 24}}>
                <Button style={buttonStyle(commonStyle.softGreenColor)}>
                    <Text style={{color: 'white', fontSize: 14}}
                          onPress={() => navigation.navigate('AccessCode', {type: UserTypeEnum.AGENT})}>un
                        conseiller
                        SnapZen</Text>
                </Button>
            </View>
        </View>
    </View>)
}

export default HomeScreen
