import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Element from './pages/Element';
import GuardedRoute from './GuardedRoute';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route
					path='/'
					element={
						<GuardedRoute>
							<Home />
						</GuardedRoute>
					}
				/>

				<Route
					path='/:id'
					element={
						<GuardedRoute>
							<Element />
						</GuardedRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
