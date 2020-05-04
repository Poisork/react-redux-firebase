import firebase from 'firebase'
import '@firebase/firestore'
import ReduxSagaFirebase from 'redux-saga-firebase'
import { firebaseConfig } from '../../services/firebase/firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig)

const rsf = new ReduxSagaFirebase(firebaseApp)

export default rsf
