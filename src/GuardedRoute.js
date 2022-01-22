import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const GuardedRoute = ({ children }) => {
	const auth = useSelector((state) => state.auth.authenticated);

	let location = useLocation();

	if (!auth) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	return children;
};

export default GuardedRoute;
