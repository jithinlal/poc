import React from 'react';
import { useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import { login } from '../store/actions/auth.action';
import { useNavigate } from 'react-router-dom';

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			await dispatch(login());
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container fixed>
			<Grid
				container
				spacing={0}
				direction='column'
				alignItems='center'
				justifyContent='center'
				style={{ minHeight: '100vh' }}
			>
				<Grid item xs={3}>
					<Stack direction='row' spacing={2}>
						<Button
							size='large'
							startIcon={<GoogleIcon />}
							color='secondary'
							onClick={handleLogin}
						>
							Login
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Login;
