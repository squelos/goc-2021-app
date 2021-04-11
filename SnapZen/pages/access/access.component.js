import React, {Component, useCallback, useEffect, useState} from 'react'
import {Button, Text, View} from "native-base";
import RoundedContainer from "../../shared/component/rounded-container/rounded-container";
import {UserTypeEnum} from "../../shared/enum/type-user.enum";
import {buttonStyle, commonStyle} from "../../shared/styles/common.style";
import Indicator from "../../shared/component/loading-indicator/indicator";
import images from "../../assets/images.registery";
import {Image} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {API_URI, fetchConnectionId} from "../../shared/services/api.service";
import {fetchConnection, fetchConnectionError, fetchConnectionSuccess} from "../../shared/store/action/user.action";
import {useNavigation} from "@react-navigation/native";
import * as apiService from '../../shared/services/api.service'

const AccessScreen = ({route, navigation}) => {
    const [pinCode, pinIsSet] = useState("")
    const {type} = route.params
    return type === UserTypeEnum.AGENT ? AgentRender((newPin) => pinIsSet(newPin), pinCode) : UserRender((newPin) => pinIsSet(newPin), pinCode)
}

const AgentRender = (settingNewPin) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(apiService.fetchConnectionId())
        settingNewPin(user.connectionId)
    },[])

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Sharing', {user: UserTypeEnum.AGENT})
        }, 10000)
    }, [])

    return (<View style={{flex: 1}}>
        <View style={{flex: 1, marginTop: 72}}>
            <View style={{paddingHorizontal: 56}}>
                <Text style={{alignSelf: 'center', fontSize: 32, textAlign: 'center', fontWeight: 'bold'}}>Je suis un
                    conseiler
                    SnapZen</Text>
            </View>
            <View style={{paddingHorizontal: 48, marginTop: 88}}>
                <Text style={{fontSize: 16, textAlign: 'center'}}>Merci de transmettre ce code à votre
                    assuré pour initier la connexion :</Text>
            </View>
            <View style={{marginTop: 48}}>
                <RoundedContainer pin={user.connectionId}/>
            </View>
        </View>
        <View style={{flex: 1, marginTop: 72}}>
            <Indicator/>
        </View>
    </View>)
}

const UserRender = (setPinCode, pinCode) => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const apiCall = useCallback(() => {
        dispatch(apiService.postConnectionId(pinCode, user.name, user.uuid))
    })
    return (<View style={{flex: 1}}>
        <View style={{flex: 1, marginTop: 80}}>
            <Text style={{alignSelf: 'center', fontSize: 32}}>Bonjour {user.name}</Text>
            <View style={{paddingHorizontal: 72}}>
                <Text style={{marginTop: 72, fontSize: 16, textAlign: 'center'}}>pour accéder à l'application merci
                    d'entrer le code que vous
                    avez reçu par email</Text>
            </View>
            <View style={{marginTop: 54}}>
                <RoundedContainer pin={pinCode} onSetPin={(onSet) => setPinCode(onSet)} isSetInput={true}/>
            </View>
            <Text style={{alignSelf: 'center', color: commonStyle.purpleColor, marginTop: 16}}>Je n'ai pas reçu de code
                ...</Text>
            <View style={{alignSelf: 'center', marginTop: 40}}>
                <Image source={images.MAIL}/>
            </View>
            <View style={{paddingHorizontal: 24, marginTop: 40}}>
                <Button style={[pinCode.length >= 2 ? buttonStyle(commonStyle.purpleColor): buttonStyle(commonStyle.lightPurpleColor)]} onPress={() => {
                    apiCall()
                    navigation.navigate('Sharing', {user: UserTypeEnum.USER})
                }} disabled={pinCode.length <= 0}>
                    <Text>Accéder à l'application</Text>
                </Button>
            </View>
        </View>
    </View>)
}

export default AccessScreen
