import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/authContext';
import NavLink from '../components/NavLink';
import AuthForm from '../components/AuthForm';

const SigninScreen = ({ navigation }) => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext);
    console.log('Clear error message from Sign In', state);
    return (
        <View style = {styles.container}>
            <NavigationEvents
                onWillBlur = { clearErrorMessage }
            />
            <AuthForm 
                headerText = 'Sign In to your Account'
                errorMessage = { state.errorMessage }
                onSubmit = { signin }
                submitButtonText = 'Sign In'
                />
           <NavLink 
                text = "Don't have an account? Go back to Sign Up"
                routeName = 'Signup'
           />
        </View>
    )
}

SigninScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom:50
    },
})

export default SigninScreen;