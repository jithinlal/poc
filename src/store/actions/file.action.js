import { showLoading, hideLoading } from 'react-redux-loading-bar';
import dayjs from 'dayjs';
import axios from 'axios';
import { LIST_FILES } from '../types/file';
import appwrite from '../../appwrite.config';

export function getFiles(folderName) {
	return async (dispatch, getState) => {
		try {
			const { auth } = getState();
			let jwt = auth.jwt;
			const jwtCreated = auth.jwtCreated;
			const sessionId = auth.sessionId;
			if (dayjs().diff(jwtCreated, 'minute') >= 15) {
				let result = await appwrite.account.createJWT();
				jwt = result.jwt;
			}

			dispatch(showLoading());

			const response = await axios.get(
				`${process.env.REACT_APP_API}/api/files/${folderName}?session=${sessionId}`,
				{
					'Content-Type': 'application/json',
					headers: { authorization: `Bearer ${jwt}` },
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
