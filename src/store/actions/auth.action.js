import { showLoading, hideLoading } from 'react-redux-loading-bar';
import dayjs from 'dayjs';
import { LOGIN, LOGOUT } from '../types/auth';
import appwrite from '../../appwrite.config';

export function login(email, password) {
	return async (dispatch, getState) => {
		try {
			dispatch(showLoading());
			const result = await appwrite.account.createSession(email, password);
			let { jwt } = await appwrite.account.createJWT();
			dispatch(hideLoading());

			const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
			await localStorage.setItem('auth', true);
			await localStorage.setItem('email', email);
			await localStorage.setItem('jwt', jwt);
			await localStorage.setItem('jwt_date', date);
			dispatch({
				type: LOGIN,
				uid: result.userId,
				email: result.providerUid,
				authenticated: true,
				sessionId: result.$id,
				jwt,
				jwtCreated: date,
			});
		} catch (error) {
			dispatch(hideLoading());
			console.log(error.message);
			throw new Error(error.message);
		}
	};
}

export function register(email, password) {
	return async (dispatch, getState) => {
		try {
			dispatch(showLoading());

			if (!email.endsWith('neoito.com')) {
				throw new Error('Email is not from neoito.com');
			}
			await appwrite.account.create('unique()', email, password);
			const result = await appwrite.account.createSession(email, password);
			let { jwt } = await appwrite.account.createJWT();
			dispatch(hideLoading());

			const date = dayjs();
			await localStorage.setItem('auth', true);
			await localStorage.setItem('email', email);
			await localStorage.setItem('jwt', jwt);
			await localStorage.setItem('jwt_date', date);
			dispatch({
				type: LOGIN,
				uid: result.userId,
				email: result.providerUid,
				authenticated: true,
				sessionId: result.$id,
				jwt,
				jwtCreated: date,
			});
		} catch (error) {
			dispatch(hideLoading());
			console.log(error.message);
			throw new Error(error.message);
		}
	};
}

export function logout() {
	return async (dispatch, getState) => {
		try {
			await appwrite.account.deleteSessions();
			localStorage.removeItem('auth');
			localStorage.removeItem('email');
			dispatch({
				type: LOGOUT,
			});
		} catch (error) {
			dispatch(hideLoading());
			console.log(error.message);
			throw new Error(error.message);
		}
	};
}
