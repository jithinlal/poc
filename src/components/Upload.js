import React from 'react';
import { Grid } from '@mui/material';
import { Dropzone, FileItem, FullScreenPreview } from '@dropzone-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { UPLOAD_FILES } from '../store/types/file';

function Upload({ folderName }) {
	const [files, setFiles] = React.useState([]);
	const dispatch = useDispatch();
	const jwt = useSelector((state) => state.auth.jwt);

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
				maxFileSize={1048576}
				maxFiles={5}
				accept={'image/png, image/jpeg, image/jpg, .pdf, .docx'}
				label={'Drop Files here or click to browse'}
				minHeight={'195px'}
				maxHeight={'500px'}
				url={`${process.env.REACT_APP_API}/api/upload/${folderName}`}
				method={'POST'}
				config={{
					headers: {
						authorization: `Bearer ${jwt}`,
					},
				}}
				disableScroll
				onUploadFinish={(responses) => {
					dispatch({
						type: UPLOAD_FILES,
						files: responses.map((response) => response.serverResponse.payload),
					});
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
