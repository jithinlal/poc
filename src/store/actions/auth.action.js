import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { LOGIN, LOGOUT } from '../types/auth';
import { app } from '../../firebase-config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const auth = getAuth();

export function login() {
	return async (dispatch, getState) => {
		try {
			dispatch(showLoading());
			const response = await signInWithPopup(auth, provider);
			// console.log({ response, credential });
			const { email, uid, refreshToken } = response.user;

			dispatch(hideLoading());
			await localStorage.setItem('auth', true);
			await localStorage.setItem('email', email);
			await localStorage.setItem('token', refreshToken);
			dispatch({
				type: LOGIN,
				token: refreshToken,
				uid,
				email,
				authenticated: true,
			});
		} catch (error) {
			dispatch(hideLoading());
			console.log(error);
			throw new Error('Could not login at the moment, please try again later.');
		}
	};
}

export function logout() {
	return async (dispatch, getState) => {
		try {
			auth.signOut();
			localStorage.removeItem('auth');
			localStorage.removeItem('email');
			localStorage.removeItem('token');
			dispatch({
				type: LOGOUT,
			});
		} catch (error) {
			dispatch(hideLoading());
			console.log(error);
			throw new Error(
				'Could not logout at the moment, please try again later.',
			);
		}
	};
}
