
export const UPDATE_IMAGES = 'UPDATE_IMAGES'
export const REMOVE_IMAGES = 'REMOVE_IMAGES'

export const onUpdateImage = (image) => {
    return dispatch => {
        dispatch(updateImage(image))
    }
}

export const updateImage = (image) => {
    return { type: UPDATE_IMAGES, image }
}
