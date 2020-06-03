import React, { useContext } from 'react';
import { Context as AuthContext } from '../context/authContext';
import { View, StyleSheet } from 'react-native';
import NavLink from '../components/NavLink';
import AuthForm from '../components/AuthForm';


const SigninScreen = ({navigation}) => {
    const { state, signin } = useContext(AuthContext);
    return (
        <View style = {styles.container}>
            <AuthForm 
                headerText = 'Sign In for Tracker'
                errorMesage = { state.errorMessage }
                onSubmit = { signin }
                submitButtonText = 'Sign In'
                />
           <NavLink 
                style = {styles.link}
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
    link:{
        fontSize: 16,
        color: 'blue'
    }
})

export default SigninScreen;