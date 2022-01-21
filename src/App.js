import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
	Navigate,
} from 'react-router-dom';
import Element from './Element';
import { fakeAuthProvider } from './fakeAuthProvider';
import Home from './Home';
import Login from './Login';

let AuthContext = React.createContext(null);

function useAuth() {
	return React.useContext(AuthContext);
}

function RequiredAuth({ children }) {
	let auth = useAuth();
	let location = useLocation();

	if (!auth.user) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	return children;
}

function AuthProvider({ children }) {
	let [user, setUser] = React.useState(null);

	let signin = (newUser, callback) => {
		return fakeAuthProvider.signin(() => {
			setUser(newUser);
			callback();
		});
	};

	let signout = (callback) => {
		return fakeAuthProvider.signout(() => {
			setUser(null);
			callback();
		});
	};

	let value = { user, signin, signout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route
						path='/'
						element={
							<RequiredAuth>
								<Home />
							</RequiredAuth>
						}
					/>
					<Route
						path='/:id'
						element={
							<RequiredAuth>
								<Element />
							</RequiredAuth>
						}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
