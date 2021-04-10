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
import {fetchConnectionError, fetchConnectionSuccess} from "../../shared/store/action/user.action";
import {useNavigation} from "@react-navigation/native";
import * as apiService from '../../shared/services/api.service'

const AccessScreen = ({route, navigation}) => {
    const [pinCode, pinIsSet] = useState("_ _ _ _")
    const {type} = route.params
    return type === UserTypeEnum.AGENT ? AgentRender((newPin) => pinIsSet(newPin), pinCode) : UserRender((newPin) => pinIsSet(newPin), pinCode)
}

const AgentRender = (settingNewPin, pinCode) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    useEffect(() => {
        fetch(API_URI + `connection/createSessionId`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(async (res) => {
                if (res.error) {
                    throw(res.error)
                }
                settingNewPin(res.sessionId)
                dispatch(fetchConnectionSuccess(res.sessionId));
            }).catch(error => dispatch(fetchConnectionError(error)))
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
            <Button style={buttonStyle(commonStyle.purpleColor)} onPress={() => {
                navigation.navigate('Sharing', {user: UserTypeEnum.AGENT})
            }}>
                <Text>Accéder à l'application</Text>
            </Button>
            <View style={{marginTop: 48}}>
                <RoundedContainer pin={pinCode}/>
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
        console.log(pinCode, user.name, user.uuid)
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
                <Button style={buttonStyle(commonStyle.purpleColor)} onPress={() => {
                    apiCall()
                    navigation.navigate('Sharing', {user: UserTypeEnum.USER})
                }}>
                    <Text>Accéder à l'application</Text>
                </Button>
            </View>
        </View>
    </View>)
}

export default AccessScreen
