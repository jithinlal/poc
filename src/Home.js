import React from 'react';
import { Dropzone, FileItem, FullScreenPreview } from '@dropzone-ui/react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from './Components/Breadcrumb';
import { trimWord } from './Utils/helpers';

function handleClick(event) {
	event.preventDefault();
	console.info('You clicked a breadcrumb.');
}

function Home() {
	const navigate = useNavigate();

	const [files, setFiles] = React.useState([]);
	const [labels, setLabels] = React.useState([
		{ id: 1, name: 'Office Docs', route: 'office-docs' },
		{ id: 2, name: 'Personal docs', route: 'personal-docs' },
		{ id: 3, name: 'Nextport', route: 'nextport' },
	]);
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
						<Breadcrumb />
					</div>
				</Grid>
				<Stack direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row' }}>
					{labels.map((label) => (
						<Stack
							alignItems='center'
							justifyContent='space-between'
							padding={5}
							key={label.id}
						>
							<FolderIcon
								sx={{ fontSize: 200 }}
								onClick={() => {
									navigate(`/${label.route}`);
								}}
							/>
							<Typography variant='h4'>{trimWord(label.name)}</Typography>
						</Stack>
					))}
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

export default Home;
