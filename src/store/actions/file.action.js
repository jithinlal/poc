import { showLoading, hideLoading } from 'react-redux-loading-bar';
import axios from 'axios';
import { LIST_FILES, UPLOAD_FILES } from '../types/file';

export function getFiles(folderName) {
	return async (dispatch, getState) => {
		try {
			dispatch(showLoading());
			const response = await axios.get(
				`http://localhost:3001/api/files/${folderName}`,
				{
					'Content-Type': 'application/json',
				},
			);

			const { data } = response;

			dispatch(hideLoading());

			dispatch({
				type: LIST_FILES,
				files: data.files,
			});
			return response;
		} catch (error) {
			dispatch(hideLoading());
			console.log(error);
			throw new Error(
				'Could not fetch files at the moment, please try again later.',
			);
		}
	};
}

export function uploadFiles(files) {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: UPLOAD_FILES,
				files,
			});
		} catch (error) {
			dispatch(hideLoading());
			console.log(error);
			throw new Error(
				'Could not uploaded files at the moment, please try again later.',
			);
		}
	};
}
