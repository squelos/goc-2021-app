import React, {Component} from "react";
import {Button, Header, Text, View} from "native-base";
import {buttonStyle, commonStyle} from "../../shared/styles/common.style";
import {UserTypeEnum} from "../../shared/enum/type-user.enum";


const HomeScreen= ({navigation}) => {
        return (<View style={{flex: 1}}>
            <View style={{flex: 2}}>
                <Text style={{fontSize: 32, alignSelf: 'center', marginTop:  120}}>Bienvenue sur SnapZen</Text>
                <View style={{padding: 40}}>
                    <Text
                        style={{fontSize: 16, lineHeight: 20, alignSelf: 'center', padding: 32, textAlign: 'center'}}
                    >Déclarer un sinistre sans stress grâce à votre conseiller</Text>
                </View>
            </View>
            <View style={{flex: 1}}>
                <Text style={{alignSelf: "center", marginBottom: 16, color: commonStyle.purpleColor, fontSize: 12}}>Pour commencer,
                    êtes vous ?</Text>
                <View style={{paddingHorizontal: 24, marginBottom: 16}}>
                    <Button style={buttonStyle(commonStyle.purpleColor)} onPress={() => navigation.navigate('AccessCode', { type: UserTypeEnum.USER }) }>
                        <Text style={{color: 'white', fontSize: 14}}>un assuré SnapZen</Text>
                    </Button>
                </View>
                <View style={{paddingHorizontal: 24}}>
                    <Button style={buttonStyle(commonStyle.softGreenColor)}>
                        <Text style={{color: 'white', fontSize: 14}} onPress={() => navigation.navigate('AccessCode', { type: UserTypeEnum.AGENT })}>un conseiller SnapZen</Text>
                    </Button>
                </View>
            </View>
        </View>)
}

export default HomeScreen
