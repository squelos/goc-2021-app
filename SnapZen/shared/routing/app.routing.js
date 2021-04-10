import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../../pages/home/home.component";
import {NavigationContainer} from "@react-navigation/native";
import AccessScreen from "../../pages/access/access.component";
import ScreenShare from "../../pages/screenshare/screenshare.component";

export const AppRouting = createStackNavigator()

export const AppContainer = () => {
    return <NavigationContainer>
        <AppRouting.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <AppRouting.Screen name="Home" component={HomeScreen}  />
            <AppRouting.Screen name="AccessCode" component={AccessScreen}/>
            <AppRouting.Screen name="Sharing" component={ScreenShare} />
        </AppRouting.Navigator>
    </NavigationContainer>
}
