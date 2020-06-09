import '../_mockLocation';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { Text } from 'react-native-elements';
import { Context as LocationContext } from '../context/locationContext'
import Map from '../components/Map';
import useLocation from '../hooks/useLocation';
 
const TrackCreateScreen = ({ isFocused }) => {
    const { addLocation } = useContext(LocationContext);
    const [ error ] = useLocation(isFocused, addLocation);

    return (
        <SafeAreaView forceInset = {{ top: 'always'}}>
            <Text h2>Create a track</Text>
            <Map/>
            {error ? <Text>Please enable location services</Text> : null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})

export default withNavigationFocus(TrackCreateScreen);

