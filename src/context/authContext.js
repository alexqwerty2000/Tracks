import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error': 
            return {...state, errorMessage: action.payload };
        case 'signin':
            return {errorMessage: '', token: action.payload};
        case 'logout': 
            return { token: null, errorMessage:''}
        case 'clear_error':
            return {...state, errorMessage: ''};
        default: 
            return state;
    }
}

const tryLocalSignin = (dispatch) = async() => {
    const token = await AsyncStorage.getItem('token');
    if (token){
        dispatch({type:'signin', payload: token});
        navigate('mainFlow');
    } else  {
        navigate('loginFlow');
    }
}

const clearErrorMessage = (dispatch) => () => {
        dispatch({type: 'clear_error' });
}

const signup = (dispatch) => async({ email,password }) => {
    try{
        const response = await trackerApi.post('/signup', {email,password})
        await AsyncStorage.setItem('token', response.data.token);
        console.log('Token',response.data.token)
        dispatch({type: 'signin', payload: response.data.token })
        navigate('mainFlow');
    }catch (err) {
        dispatch({type:'add_error', payload: 'Something went wrong with Sign Up'})
    }
}

const signin =  (dispatch) => async ({ email, password}) => {
    try{
        const response = await trackerApi.post('/signin', {email, password});
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({type: 'signin', payload: response.data.token});
        navigate('mainFlow');
    }catch (err) {
        dispatch({ type: 'add_error', payload: 'Something went wrong with Sign In'});
    }
}

const signout = (dispatch) => async () => {
    try{
        await AsyncStorage.removeItem('token');
        dispatch({type :'signout'});
        navigate('Signup')
    }catch {
        dispatch({type: 'add-error', payload: 'Something went wrong with Sign Out'})
    }
    
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
)