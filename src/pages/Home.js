import React from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { trimWord } from '../Utils/helpers';
import { logout } from '../store/actions/auth.action';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function handleClick(event) {
	event.preventDefault();
	console.info('You clicked a breadcrumb.');
}

function Home() {
	const dispatch = useDispatch();
	const handleLogout = async () => {
		try {
			await dispatch(logout());
			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	};

	const navigate = useNavigate();

	const [labels, setLabels] = React.useState([
		{ id: 1, name: 'Office docs', route: 'office-docs' },
		{ id: 2, name: 'Personal docs', route: 'personal-docs' },
		{ id: 3, name: 'Project docs', route: 'project-docs' },
	]);

	return (
		<Container fixed>
			<Grid container>
				<Grid
					container
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					marginLeft={5}
					marginTop={5}
				>
					<Grid item>
						<div role='presentation' onClick={handleClick}>
							<Breadcrumb />
						</div>
					</Grid>
					<Grid item>
						<IconButton onClick={handleLogout}>
							<LogoutIcon />
						</IconButton>
					</Grid>
				</Grid>
				<Grid container direction='row'>
					{labels.map((label) => (
						<Grid key={label.id} item lg={4} sm={4} md={4} xs={12}>
							<Stack
								alignItems='center'
								justifyContent='space-between'
								padding={5}
							>
								<FolderIcon
									sx={{ fontSize: 200 }}
									onClick={() => {
										navigate(`/${label.route}`);
									}}
								/>
								<Typography variant='h4'>{trimWord(label.name)}</Typography>
							</Stack>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Container>
	);
}

export default Home;
