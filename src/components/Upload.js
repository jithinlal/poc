import React from 'react';
import { Grid } from '@mui/material';
import { Dropzone, FileItem, FullScreenPreview } from '@dropzone-ui/react';
import { useDispatch } from 'react-redux';
import { uploadFiles } from '../store/actions/file.action';

function Upload({ folderName }) {
	const [files, setFiles] = React.useState([]);
	const dispatch = useDispatch();

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
		<Grid container marginTop={10}>
			<Dropzone
				onChange={updateFiles}
				value={files}
				onClean
				maxFileSize={10485760}
				accept={'image/png, image/jpeg, image/jpg, .pdf, .docx'}
				label={'Drop Files here or click to browse'}
				minHeight={'195px'}
				maxHeight={'500px'}
				url={`http://localhost:3001/api/upload/${folderName}`}
				method={'POST'}
				disableScroll
				onUploadFinish={(responses) => {
					dispatch(
						uploadFiles(
							responses.map((response) => response.serverResponse.payload),
						),
					);
				}}
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
	);
}

export default Upload;
