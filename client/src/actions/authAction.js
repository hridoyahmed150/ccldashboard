import axios from "axios";
import jwt_decode from 'jwt-decode'

import {GET_ERRORS , SET_CURRENT_USER} from './types';
import setAuthToken from '../utils/setAuthToken';
// register
export const registerUser=(userData,history)=>(dispatch)=>{
	axios.post('/api/users/register',userData)
	.then(user=>{
		history.push('/login')
	})
	.catch(err=>{
		dispatch(
			{
				type:GET_ERRORS,
				payload:err.response.data
			}
		)
	})
}


// Login user

export const loginUser=userData=>dispatch=>{
	axios.post('/api/users/login',userData)
		.then(user=>{
			// Save to local storage
			const {token}= user.data;
			// set token to local storage
			localStorage.setItem('jwtToken',token)

			// set token to header
			setAuthToken(token);
			// decode token to get user data 
			const decoded = jwt_decode(token);
			// set corrent user 
			dispatch(setCurrentUser(decoded));

		}).catch(err=>{
			dispatch(
				{
					type:GET_ERRORS,
					payload:err.response.data
				}
			)
		})
}




export const setCurrentUser=(decoded)=>{
	return {
		type:SET_CURRENT_USER,
		payload:decoded
	}
}


// Log user out 

export const logoutUser=(history)=>dispatch=>{
	// remove token from local storage 
	localStorage.removeItem('jwtToken');
	// remove auth header for future requests 
	setAuthToken(false);
	// set current user to {} which will set is isAuthenticate to false 
	dispatch(setCurrentUser({}));
	history.push('/login')
}