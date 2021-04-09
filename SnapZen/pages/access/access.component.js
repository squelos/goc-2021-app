import React, {Component, useState} from 'react'
import {Button, Text, View} from "native-base";
import RoundedContainer from "../../shared/component/rounded-container/rounded-container";
import {UserTypeEnum} from "../../shared/enum/type-user.enum";
import {buttonStyle, commonStyle} from "../../shared/styles/common.style";

const AccessScreen = ({route, navigation}) => {
    const [pinCode, pinIsSet] = useState("_ _ _ _")
    const {type} = route.params
    console.log(type)
    return type === UserTypeEnum.AGENT ? AgentRender(pinCode) : UserRender()
}

const AgentRender = (pin) => {
    return (<View style={{flex: 1}}>
        <View style={{flex: 1, marginTop: 40}}>
            <Text style={{alignSelf: 'center', fontSize: 32}}>Je suis un conseiler SnapZen</Text>
            <View style={{padding: 24}}>
                <Text style={{marginTop: 40, fontSize: 16, textAlign: 'center'}}>Merci de transmettre ce code à votre
                    assuré pour intier la connexion :</Text>
            </View>
            <RoundedContainer pin={pin}/>
        </View>
    </View>)
}

const UserRender = () => {
    return (<View style={{flex: 1}}>
        <View style={{flex: 1, marginTop: 40}}>
            <Text style={{alignSelf: 'center', fontSize: 32}}>Bonjour name</Text>
            <View style={{padding: 24}}>
                <Text style={{marginTop: 40, fontSize: 16, textAlign: 'center'}}>pour accéder à l'application merci
                    d'entrer le code que vous
                    avez reçu par email</Text>
            </View>
            <RoundedContainer pin={(pin) => null}/>
            <View style={{padding: 24}}>
                <Button style={buttonStyle(commonStyle.purpleColor)}>
                    <Text>Accéder à l'application</Text>
                </Button>
            </View>
        </View>
    </View>)
}

export default AccessScreen
