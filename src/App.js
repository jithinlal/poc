import './App.css';
import React from 'react';
import { Dropzone, FileItem, FullScreenPreview } from '@dropzone-ui/react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

function handleClick(event) {
	event.preventDefault();
	console.info('You clicked a breadcrumb.');
}

function App() {
	const [files, setFiles] = React.useState([]);
	const [imageSrc, setImageSrc] = React.useState(undefined);
	const updateFiles = (incommingFiles) => {
		console.log('incomming files', incommingFiles);
		setFiles(incommingFiles);
	};
	const handleDelete = (id) => {
		setFiles(files.filter((x) => x.id !== id));
	};
	const handleSee = (imageSource) => {
		setImageSrc(imageSource);
	};
	return (
		<Container fixed>
			<Grid container>
				<Grid item xs={12} md={12} lg={12} marginLeft={5} marginTop={5}>
					<div role='presentation' onClick={handleClick}>
						<Breadcrumbs aria-label='breadcrumb'>
							<Link underline='hover' color='inherit' href='/'>
								MUI
							</Link>
							<Link
								underline='hover'
								color='inherit'
								href='/getting-started/installation/'
							>
								Core
							</Link>
							<Typography color='text.primary'>Breadcrumbs</Typography>
						</Breadcrumbs>
					</div>
				</Grid>
				<Stack direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }}>
					<Stack alignItems='center'>
						<FolderIcon sx={{ fontSize: 200 }} />
						<Typography variant='h4'>Label 1</Typography>
					</Stack>
					<Stack alignItems='center'>
						<FolderIcon sx={{ fontSize: 200 }} />
						<Typography variant='h4'>Label 2</Typography>
					</Stack>
					<Stack alignItems='center'>
						<FolderIcon sx={{ fontSize: 200 }} />
						<Typography variant='h4'>Label 3</Typography>
					</Stack>
					<Stack alignItems='center'>
						<FolderIcon sx={{ fontSize: 200 }} />
						<Typography variant='h4'>Label 4</Typography>
					</Stack>
				</Stack>
			</Grid>
			<Grid container marginTop={10}>
				<Dropzone
					onChange={updateFiles}
					value={files}
					onClean
					maxFileSize={10485760}
					accept={'image/png,.ts, video/*'}
					label={'Drop Files here or click to browse'}
					minHeight={'195px'}
					maxHeight={'500px'}
					url={'google.com'}
					method={'POST'}
					fakeupload
					uploadOnDrop
					disableScroll
				>
					{files.map((file) => (
						<FileItem
							{...file}
							key={file.id}
							onDelete={handleDelete}
							onSee={handleSee}
							alwaysActive
							preview
							info
							hd
							resultOnTooltip
						/>
					))}
					<FullScreenPreview
						imgSource={imageSrc}
						openImage={imageSrc}
						onClose={(e) => handleSee(undefined)}
					/>
				</Dropzone>
			</Grid>
		</Container>
	);
}

export default App;
