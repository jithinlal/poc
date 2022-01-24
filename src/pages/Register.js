import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Button, Snackbar, TextField } from '@mui/material';
import { register } from '../store/actions/auth.action';
import { useNavigate } from 'react-router-dom';

function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [error, setError] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleRegister = async () => {
		try {
			await dispatch(register(email, password));
			navigate('/');
		} catch (error) {
			setOpen(true);
			setError(error.message);
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
				<Grid item>
					<Stack direction='column' spacing={2}>
						<TextField
							label='Email'
							variant='outlined'
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							label='Password'
							variant='outlined'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
							color='secondary'
							onClick={handleRegister}
							variant='outlined'
						>
							REGISTER
						</Button>
						<Button color='info' onClick={() => navigate('/login')}>
							Got an account?
						</Button>
					</Stack>
				</Grid>
			</Grid>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				message={error}
			/>
		</Container>
	);
}

export default Register;
