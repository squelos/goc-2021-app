import {StyleSheet} from "react-native";

export const commonStyle = {
    purpleColor: '#8a56ac',
    softGreenColor: '#89c5cc',
    softBlueColor: '#ECF9FB'
}


export const buttonStyle = (backgroundColor: string) => ({
    "backgroundColor": backgroundColor,
    "alignSelf": 'stretch',
    "justifyContent": 'center',
    "borderRadius": 24,
    "paddingHorizontal": 24
})


export const shadowStyle = ({shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowColor: "#000",
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2})
