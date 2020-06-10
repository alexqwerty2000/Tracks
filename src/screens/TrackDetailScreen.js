import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as TrackContext } from '../context/trackContext';
import MapView, { Polyline } from 'react-native-maps';

const TrackRetailScreen = ({ navigation }) => {
    const { state } = useContext(TrackContext);
    const _id = navigation.getParam('_id');

    const track = state.find((item) => item._id === _id);
    const initialCoords = track.locations[0].coords;
    return (
        <View>
            <Text style={{fontSize:48}}>{track.name}</Text>
            <MapView
                initialRegion ={{
                    longitudeDelta : 0.01,
                    latitudeDelta : 0.01,
                    ...initialCoords,
                    
                }}
                style = {styles.map}
            >
                <Polyline coordinates = {track.locations.map(location => location.coords)}/>
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        height: 300
    }
})

export default TrackRetailScreen;