const fakeAuthProvider = {
	isAuthenticated: false,
	signin(callback) {
		fakeAuthProvider.isAuthenticated = true;
	},
	signout(callback) {
		fakeAuthProvider.isAuthenticated = false;
	},
};

export { fakeAuthProvider };
