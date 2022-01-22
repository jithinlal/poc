import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Element from './components/Element';
import GuardedRoute from './GuardedRoute';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route
					path='/'
					element={
						<GuardedRoute>
							<Home />
						</GuardedRoute>
					}
				/>

				<Route path='/:id' element={<Element />} />
			</Routes>
		</Router>
	);
}

export default App;
