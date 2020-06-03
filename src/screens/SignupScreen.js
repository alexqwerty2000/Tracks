import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import  { Context as AuthContext } from '../context/authContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink'

const SignupScreen = ({ navigation }) => {
    const { state, signup } = useContext(AuthContext);
    return (
        <View style = {styles.container}>
            <AuthForm 
                headerText = 'Sign Up for Tracker'
                errorMesage = { state.errorMessage }
                onSubmit = { signup }
                submitButtonText = 'Sign Up'
                />
           <NavLink 
                text = 'Already have an account? Sign In instead'
                routeName = 'Signin'
           />
        </View>
    )
}

SignupScreen.navigationOptions = () => {
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
    link:{
        fontSize: 16,
        color: 'blue'

    }
})

export default SignupScreen;