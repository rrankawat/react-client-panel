import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import { createStore, combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import { composeWithDevTools } from 'redux-devtools-extension';

const fbConfig = {
  apiKey: 'AIzaSyDHwZxtlR7jHVHl565h92NvtWaNpPtuVa4',
  authDomain: 'rrankawat-react-client-panel.firebaseapp.com',
  projectId: 'rrankawat-react-client-panel',
  storageBucket: 'rrankawat-react-client-panel.appspot.com',
  messagingSenderId: '572122616744',
  appId: '1:572122616744:web:56912c09a184dc970cc39d',
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
firebase.firestore();

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

// Create store with reducers and initial state
const initialState = {};

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools()
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
