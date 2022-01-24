import { LOGIN, LOGOUT } from '../types/auth';

const initialState = {
	uid: null,
	email: null,
	authenticated: false,
	sessionId: null,
	jwt: null,
	jwtCreated: null,
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
					sessionId: action.sessionId,
					jwt: action.jwt,
					jwtCreated: action.jwtCreated,
				},
			};
		case LOGOUT:
			return {
				...state,
				...{
					uid: null,
					email: null,
					authenticated: false,
					sessionId: null,
					jwt: null,
					jwtCreated: null,
				},
			};
		default:
			return state;
	}
}
