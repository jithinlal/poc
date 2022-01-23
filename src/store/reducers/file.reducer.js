import { LIST_FILES, UPLOAD_FILES, CLEAR_FILES } from '../types/file';

const initialState = {
	files: [],
};

export default function fileAction(state = initialState, action) {
	switch (action.type) {
		case LIST_FILES:
			return {
				...state,
				...{
					files: action.files,
				},
			};
		case UPLOAD_FILES:
			return {
				...state,
				files: [...state.files, ...action.files],
			};
		case CLEAR_FILES:
			return {
				...state,
				files: [],
			};
		default:
			return state;
	}
}
