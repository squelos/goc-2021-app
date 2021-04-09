import React, {Component} from "react";
import {Button, Image, Text, View} from "react-native";


export default class HomeScreen extends Component {
    render() {
        return (<View>
            <Image source={{uri: 'https://www.mandysam.com/img/random.jpg'}} style={{width: 600, height: 100}}></Image>
            <Text>Bienvenue sur SnapZen</Text>
            <Text>Déclarer un sinistre sans stress grâce à votre conseiller</Text>
            <Button title="un assuré SnapZen" onPress={() => console.log('assuré')} />
            <Button title="un conseillé SnapZen" onPress={() => console.log('assuré')} />
        </View>)
    }
}
