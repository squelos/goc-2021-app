import * as snapAction from '../action/snap.action'

const initialState = {
    images: []
}

export const snapReducer = (state = initialState, action) => {
    switch (action.type){
        case snapAction.UPDATE_IMAGES:
            console.log(state.images)
            const images = state.images
            images.push(action.image)
            return { ...state, images};
        default:
            return state;
    }
}
