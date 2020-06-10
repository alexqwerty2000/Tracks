import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Context as TrackContext } from '../context/trackContext';
import { ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

const TrackListScreen = ({navigation}) => {
    const { state, fetchTracks } = useContext(TrackContext);

    return (
        <View>
            <NavigationEvents onWillFocus = {fetchTracks}/>
            {/* <Text style={{fontSize: 48}}>TrackListScreen</Text> */}
            <FlatList 
                data ={state}
                keyExtractor = { item => item._id}
                renderItem = {({item}) => {
                    return <TouchableOpacity 
                            onPress = {() => navigation.navigate('TrackDetail', { _id: item._id})}
                            >
                                <ListItem chevron title = {item.name}/>
                            </TouchableOpacity>
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({});

TrackListScreen.navigationOptions = {
    title:'Tracks'
};

export default TrackListScreen;