import React, {useCallback, useEffect} from 'react';
import {View, SafeAreaView, Button, StyleSheet} from 'react-native';
import UserTypeEnum, {UserTypeEnum as userTypeEnum} from '../../enum/type-user.enum'

import {RTCPeerConnection, RTCView, mediaDevices} from 'react-native-webrtc';

export const Rtc = (user) => {
    const [localStream, setLocalStream] = React.useState();
    const [remoteStream, setRemoteStream] = React.useState();
    const [cachedLocalPC, setCachedLocalPC] = React.useState();
    const [cachedRemotePC, setCachedRemotePC] = React.useState();

    const [isMuted, setIsMuted] = React.useState(false);

    useEffect(() => {
        startLocalStream()
        startCall()
    }, [])

    const startLocalStream = async (userType) => {
        // isFront will determine if the initial camera should face user or environment
        const isFront = false;
        const devices = await mediaDevices.enumerateDevices();

        const facing = isFront ? 'front' : 'environment';
        const videoSourceId = devices.find(device => device.kind === 'videoinput' && device.facing === facing);
        const facingMode = isFront ? 'user' : 'environment';
        const constraints = {
            audio: true,
            video: {
                mandatory: {
                    minWidth: 500, // Provide your own width, height and frame rate here
                    minHeight: 300,
                    minFrameRate: 30,
                },
                facingMode,
                optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
            },
        };
        const newStream = await mediaDevices.getUserMedia(constraints);
        setLocalStream(newStream);
    };

    const startCall = async () => {
        // You'll most likely need to use a STUN server at least. Look into TURN and decide if that's necessary for your project
        const configuration = {iceServers: [{urls: 'stun:turboreactcore.westeurope.cloudapp.azure.com:3478'}]};
        const localPC = new RTCPeerConnection(configuration);
        const remotePC = new RTCPeerConnection(configuration);


        // could also use "addEventListener" for these callbacks, but you'd need to handle removing them as well
        localPC.onicecandidate = e => {
            try {
                if (e.candidate) {
                    remotePC.addIceCandidate(e.candidate);
                }
            } catch (err) {
                console.error(`Error adding remotePC iceCandidate: ${err}`);
            }
        };
        remotePC.onicecandidate = e => {
            try {
                if (e.candidate) {

                }
            } catch (err) {
                console.error(`Error adding localPC iceCandidate: ${err}`);
            }
        };
        remotePC.onaddstream = e => {
            if (e.stream && remoteStream !== e.stream) {
                setRemoteStream(e.stream);
            }
        };

        // AddTrack not supported yet, so have to use old school addStream instead
        // newStream.getTracks().forEach(track => localPC.addTrack(track, newStream));
        localPC.addStream(localStream);
        try {
            const offer = await localPC.createOffer();
            await localPC.setLocalDescription(offer);
            await remotePC.setRemoteDescription(localPC.localDescription);
            const answer = await remotePC.createAnswer();
            await remotePC.setLocalDescription(answer);
            await localPC.setRemoteDescription(remotePC.localDescription);
        } catch (err) {
            console.error(err);
        }
        setCachedLocalPC(localPC);
        setCachedRemotePC(remotePC);
    };

    const switchCamera = () => {
        localStream.getVideoTracks().forEach(track => track._switchCamera());
    };

    // Mutes the local's outgoing audio
    const toggleMute = () => {
        if (!remoteStream) return;
        localStream.getAudioTracks().forEach(track => {
            console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
            track.enabled = !track.enabled;
            setIsMuted(!track.enabled);
        });
    };

    const closeStreams = () => {
        if (cachedLocalPC) {
            cachedLocalPC.removeStream(localStream);
            cachedLocalPC.close();
        }
        if (cachedRemotePC) {
            cachedRemotePC.removeStream(remoteStream);
            cachedRemotePC.close();
        }
        setLocalStream();
        setRemoteStream();
        setCachedRemotePC();
        setCachedLocalPC();
    };
    useEffect(async () => startCall(), [])
    return (
        <View style={styles.container}>


            <View style={styles.rtcview}>
                {localStream && <RTCView  style={styles.rtc} streamURL={localStream.toURL()}/>}
            </View>
            {user === userTypeEnum.AGENT && <View style={styles.rtcview}>
                <RTCView style={styles.rtc} streamURL={remoteStream.toURL()}/>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    text: {
        fontSize: 30,
    },
    rtcview: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
        backgroundColor: 'black',
        resizeMode: 'contain'
    },
    rtc: {
        width: '80%',
        height: '100%',
    },
    toggleButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default Rtc
