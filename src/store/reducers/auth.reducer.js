import { LOGIN, LOGOUT } from '../types/auth';

const initialState = {
	uid: null,
	email: null,
	authenticated: false,
	token: null,
};

export default function authAction(state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				...{
					uid: action.uid,
					email: action.email,
					authenticated: action.authenticated,
					token: action.token,
				},
			};
		case LOGOUT:
			return {
				...state,
				...{
					uid: null,
					email: null,
					authenticated: false,
					token: null,
				},
			};
		default:
			return state;
	}
}
