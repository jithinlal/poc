import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Breadcrumb from './Breadcrumb';

function Element() {
	return (
		<Container fixed>
			<Grid container>
				<Grid item xs={12} md={12} lg={12} marginLeft={5} marginTop={5}>
					<div role='presentation'>
						<Breadcrumb />
					</div>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Element;
