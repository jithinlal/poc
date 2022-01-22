import { Button, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import ImageIcon from '@mui/icons-material/Image';
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { getFiles } from '../store/actions/file.action';
import Breadcrumb from './Breadcrumb';
import Upload from './Upload';
import { trimWord } from '../Utils/helpers';

function Element() {
	const dispatch = useDispatch();
	const breadcrumbs = useBreadcrumbs();
	const folderName = breadcrumbs[breadcrumbs.length - 1].key.slice(1);
	const files = useSelector((state) => state.file.files);
	useEffect(() => {
		dispatch(getFiles(folderName));
	}, [dispatch, folderName]);

	return (
		<Container fixed>
			<Grid container>
				<Grid item xs={12} md={12} lg={12} marginLeft={5} marginTop={5}>
					<div role='presentation'>
						<Breadcrumb />
					</div>
				</Grid>
				<Grid container direction='row'>
					{files.map((file) => {
						let variant;
						if (file.mimeType.includes('image')) {
							variant = (
								<>
									<ImageIcon sx={{ fontSize: 200 }} />
									<Typography variant='h4'>{trimWord(file.name)}</Typography>
									{/* TODO :: projectID should be in a environment variable */}
									<Button
										href={`http://localhost/v1/storage/files/${file.$id}/view?project=61ec39a34ab3c51ae226&mode=admin`}
										target='_blank'
									>
										View / Download
									</Button>
								</>
							);
						} else if (file.mimeType.includes('pdf')) {
							variant = (
								<>
									<PictureAsPdfIcon sx={{ fontSize: 200 }} />
									<Typography variant='h4'>{trimWord(file.name)}</Typography>
									<Button
										href={`http://localhost/v1/storage/files/${file.$id}/view?project=61ec39a34ab3c51ae226&mode=admin`}
										target='_blank'
									>
										View / Download
									</Button>
								</>
							);
						} else {
							variant = (
								<>
									<ArticleIcon sx={{ fontSize: 200 }} />
									<Typography variant='h4'>{trimWord(file.name)}</Typography>
									<Button
										href={`http://localhost/v1/storage/files/${file.$id}/view?project=61ec39a34ab3c51ae226&mode=admin`}
										target='_blank'
									>
										View / Download
									</Button>
								</>
							);
						}
						return (
							<Grid key={file.$id} item lg={4} sm={4} md={4} xs={12}>
								<Stack
									alignItems='center'
									justifyContent='space-between'
									padding={5}
								>
									{variant}
								</Stack>
							</Grid>
						);
					})}
				</Grid>
			</Grid>
			<Upload folderName={folderName} />
		</Container>
	);
}

export default Element;
