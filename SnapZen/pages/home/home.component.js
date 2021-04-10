import React, {Component, useState} from "react";
import {Button, Header, Text, View} from "native-base";
import {buttonStyle, commonStyle} from "../../shared/styles/common.style";
import {UserTypeEnum} from "../../shared/enum/type-user.enum";
import {Image, Dimensions} from "react-native";
import images from "../../assets/images.registery";
import fetchUuid, {fetchSensitiveData} from "../../shared/services/api.service";
import {connect} from "react-redux";
import {getData, hasUuid} from "../../shared/services/secure-store.service";


class HomeScreen extends React.Component {


    async componentDidMount() {
        !await hasUuid ?
            this.props.dispatch(fetchUuid("jean")) :
            this.props.dispatch(fetchSensitiveData(await getData('id'), await getData('name')))
    }

    render() {
        return (<View style={{flex: 1}}>
            <View style={{flex: 3, marginTop: 90}}>
                <Image source={images.LOGO} style={{height: 300, width: 300, alignSelf: 'center'}}
                       resizeMode="contain"/>
                <View style={{paddingHorizontal: 100, marginTop: 72}}>
                    <Image source={images.WELCOME} />
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
                            onPress={() => this.props.navigation.navigate('AccessCode', {type: UserTypeEnum.USER})}>
                        <Text style={{color: 'white', fontSize: 14}}>un assuré SnapZen</Text>
                    </Button>
                </View>
                <View style={{paddingHorizontal: 24}}>
                    <Button style={buttonStyle(commonStyle.softGreenColor)}>
                        <Text style={{color: 'white', fontSize: 14}}
                              onPress={() => this.props.navigation.navigate('AccessCode', {type: UserTypeEnum.AGENT})}>un
                            conseiller
                            SnapZen</Text>
                    </Button>
                </View>
            </View>
        </View>)
    }
}

const MapStateToProps = state => {
    return {user: state.user}
}

export default connect(MapStateToProps)(HomeScreen)
