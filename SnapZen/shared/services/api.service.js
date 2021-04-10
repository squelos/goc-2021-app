import {
    fetchConnection,
    fetchConnectionError,
    fetchConnectionSuccess,
    fetchUserUuid,
    fetchUserUuidError,
    fetchUserUuidSuccess
} from "../store/action/user.action";
import NInfo from 'react-native-sensitive-info'

export const API_URI = 'https://goc-snapzen-d.azurewebsites.net/'


export function fetchUuid(name: string) {
    return dispatch => {
        dispatch(fetchUserUuid());
        fetch(`${API_URI}connection/firstConnect?name=${name}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(async (res) => {
                if(res.error){
                    throw(res.error)
                }
                await NInfo.setItem("id", res.id, {keychainService: 'SnapZen', sharedPreferencesName: 'SnapZen'});
                await NInfo.setItem("name", res.displayName, {keychainService: 'SnapZen', sharedPreferencesName: 'SnapZen'});
                dispatch(fetchUserUuidSuccess(res.id, res.displayName));
            }).catch(error => dispatch(fetchUserUuidError(error)))
    }
}

export const fetchConnectionId = () => {
    console.log('test')
    return dispatch => {
        dispatch(fetchConnection());
        fetch(`${API_URI}connection/createSessionId`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(async (res) => {
            console.log(res, 'res')
                if(res.error){
                    throw(res.error)
                }
                dispatch(fetchConnectionSuccess(res.id));
            }).catch(error => dispatch(fetchConnectionError(error)))
    }
}

export function fetchSensitiveData(uuid: string, name: string){
    return dispatch => dispatch(fetchUserUuidSuccess(uuid, name))
}

export default fetchUuid

