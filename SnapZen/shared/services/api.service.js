import {
    fetchConnection,
    fetchConnectionError,
    fetchConnectionSuccess,
    fetchUserUuid,
    fetchUserUuidError,
    fetchUserUuidSuccess, postConnection, postConnectionError, postConnectionSuccess
} from "../store/action/user.action";
import * as secureStore from './secure-store.service';

export const API_URI = 'https://goc-snapzen-d.azurewebsites.net/'


export function fetchUuid() {
    return dispatch => {
        dispatch(fetchUserUuid());
        secureStore.getData("name").then(name => {
            fetch(`${API_URI}connection/firstConnect?name=${name}`, {
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
                    await secureStore.setData("id", res.id);
                    dispatch(fetchUserUuidSuccess(res.id, res.displayName));
                }).catch(error => dispatch(fetchUserUuidError(error)))
        })
    }
}

export const fetchConnectionId = () => {
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
                if (res.error) {
                    throw(res.error)
                }
                dispatch(fetchConnectionSuccess(res.sessionId));
            }).catch(error => dispatch(fetchConnectionError(error)))
    }
}

export const postConnectionId = (pinCode, uuid, name) => {
    return dispatch => {
        dispatch(postConnection());
        fetch(`${API_URI}connection/inputSessionId?sessionId=${pinCode.toString()}`, {
            method: 'POST',
            body: {
                id: uuid,
                displayName: name
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.text())
            .then(async (res) => {
                if (res.error) {
                    throw(res.error)
                }
                dispatch(postConnectionSuccess(res));
            }).catch(error => dispatch(postConnectionError(error)))
    }
}

export function fetchSensitiveData(uuid: string, name: string) {
    return dispatch => dispatch(fetchUserUuidSuccess(uuid, name))
}

export default fetchUuid

