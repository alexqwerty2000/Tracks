import '../_mockLocation';
import React, { useState, useEffect, useContext} from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Text } from 'react-native-elements';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import { Context as LocationContext } from '../context/locationContext'
import Map from '../components/Map';

const TrackCreateScreen = () => {
    const { addLocation } = useContext(LocationContext);
    const [error, setError] = useState('');
    
    const startWatching = async () => {
        try {
            await requestPermissionsAsync();
            await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
                }, 
                location => {
                    addLocation(location)
                }
            )
        } catch (err) {
            setError(err);
        }
    }
    useEffect(() => {
        startWatching();
    }, [])
    return (
        <SafeAreaView forceInset = {{ top: 'always'}}>
            <Text h2>Create a track</Text>
            <Map/>
            {error ? <Text>Please enable location services</Text> : null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})

export default TrackCreateScreen;

