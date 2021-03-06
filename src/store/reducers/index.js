import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth from './auth.reducer';
import file from './file.reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth'],
};

const rootReducer = combineReducers({
	auth,
	file,
	loadingBar: loadingBarReducer,
});

export default persistReducer(persistConfig, rootReducer);
