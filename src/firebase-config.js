import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyDGskZ3rQ-y2HG2p40od8LYHNo1Hkw_uPQ',
	authDomain: 'file-upload-poc-7372b.firebaseapp.com',
	projectId: 'file-upload-poc-7372b',
	storageBucket: 'file-upload-poc-7372b.appspot.com',
	messagingSenderId: '830668297182',
	appId: '1:830668297182:web:8596506c253cf61e3a034f',
	measurementId: 'G-ZSNL1CHET0',
};

export const app = initializeApp(firebaseConfig);
