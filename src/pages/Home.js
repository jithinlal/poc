import React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { trimWord } from '../Utils/helpers';
import Header from '../components/Header';

function Home() {
	const navigate = useNavigate();

	const labels = [
		{ id: 1, name: 'Office docs', route: 'office-docs' },
		{ id: 2, name: 'Personal docs', route: 'personal-docs' },
		{ id: 3, name: 'Project docs', route: 'project-docs' },
	];

	return (
		<Container fixed>
			<Grid container>
				<Header />
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
