import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Breadcrumb from './Breadcrumb';
import { logout } from '../store/actions/auth.action';

function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await dispatch(logout());
			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Grid
				container
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				marginLeft={5}
				marginTop={5}
			>
				<Grid item>
					<div role='presentation'>
						<Breadcrumb />
					</div>
				</Grid>
				<Grid item>
					<IconButton onClick={handleLogout}>
						<LogoutIcon />
					</IconButton>
				</Grid>
			</Grid>
		</>
	);
}

export default Header;
