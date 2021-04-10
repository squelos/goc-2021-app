export const FETCH_USER_UUID = 'FETCH_USER_UUID'
export const FETCH_USER_UUID_SUCCESS = 'FETCH_USER_UUID_SUCCESS'
export const FETCH_USER_UUID_ERROR = 'FETCH_USER_UUID_ERROR'

export const FETCH_CONNECTION = 'FETCH_CONNECTION'
export const FETCH_CONNECTION_SUCCESS = 'FETCH_CONNECTION_SUCCESS'
export const FETCH_CONNECTION_ERROR = 'FETCH_CONNECTION_EROR'

export const fetchUserUuid = () => {
    return { type: FETCH_USER_UUID}
}

export const fetchUserUuidSuccess = (uuid, name) => {
    console.log(uuid)
    return { type: FETCH_USER_UUID_SUCCESS, uuid, name}
}

export const fetchUserUuidError = (error) => {
    return { type: FETCH_USER_UUID_ERROR, error}
}

export const fetchConnection = () => {

}

export const fetchConnectionSuccess = (connectionId) => {
    return { type: FETCH_CONNECTION_SUCCESS, connectionId}
}

export const fetchConnectionError = (error) => {
    return { type: FETCH_CONNECTION_ERROR, error}
}
