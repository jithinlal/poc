import { Appwrite } from 'appwrite';

const appwrite = new Appwrite();

appwrite
	.setEndpoint(process.env.REACT_APP_PROJECT_END_POINT)
	.setProject(process.env.REACT_APP_PROJECT_ID);

export default appwrite;
