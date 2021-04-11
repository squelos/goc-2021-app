import NInfo from 'react-native-sensitive-info';

export const hasUuid = async () => {
    const uuid = await NInfo.getItem('id', {keychainService: 'SnapZen', sharedPreferencesName: 'SnapZen'})
    return  uuid &&uuid.length > 0;
}

export const getData = async (key) => {
    return await NInfo.getItem(key, {keychainService: 'SnapZen', sharedPreferencesName: 'SnapZen'})
}

export const setData = async (key, data) => {
    return NInfo.setItem(key, data, {keychainService: 'SnapZen', sharedPreferencesName: 'SnapZen'})
}
