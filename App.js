import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'
import { Provider as AuthProvider } from './src/context/authContext';
import { Provider as LocationProvider } from './src/context/locationContext';
import { Provider as TrackProvider } from './src/context/trackContext';
import { setNavigator } from './src/navigationRef';
import { FontAwesome } from '@expo/vector-icons';

const TrackListFlow = createStackNavigator({
        TrackList: TrackListScreen,
        TrackDetail: TrackDetailScreen
});
TrackListFlow.navigationOptions= {
    title: 'Tracks',
    tabBarIcon: <FontAwesome name="th-list" size={24} color="black" />
};

const switchNavigator = createSwitchNavigator({
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator({
        Signup: SignupScreen,
        Signin: SigninScreen
    }),
    mainFlow: createBottomTabNavigator({
        TrackListFlow,
        TrackCreate: TrackCreateScreen,
        Account: AccountScreen,
    })
})

const App = createAppContainer(switchNavigator);

export default () => {
    return (
        <TrackProvider>
            <LocationProvider>
                <AuthProvider>
                    <App ref = {(navigator) => {setNavigator(navigator)}}/>
                </AuthProvider>
            </LocationProvider>
        </TrackProvider>
    )
}