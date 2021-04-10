import * as userAction from "../action/user.action";

const initialState = {
    pending: false,
    uuid: '',
    error: null,
    name: '',
    connectionId: '',
}

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case userAction.FETCH_USER_UUID:
            return { ...state,pending: true }
        case userAction.FETCH_USER_UUID_SUCCESS:
            return { ...state,pending: false, uuid: action.uuid, name: action.name}
        case userAction.FETCH_USER_UUID_ERROR:
            return { ...state,pending: false,error: action.error}
        case userAction.FETCH_CONNECTION:
            return {...state, pending: true}
        case userAction.FETCH_CONNECTION_SUCCESS:
            return {...state, pending: true, connectionId: action.connectionId}
        case userAction.FETCH_CONNECTION_ERROR:
            return {...state, pending: true, error: action.error}
        default:
            return state
    }
}
export default userReducer
