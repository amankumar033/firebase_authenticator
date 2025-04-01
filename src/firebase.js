import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBAcBLg0QgNZfAUGh44rsOlmYp4SqXI8bY",
  authDomain: "otp-authenticator-29c81.firebaseapp.com",
  projectId: "otp-authenticator-29c81",
  storageBucket: "otp-authenticator-29c81.firebasestorage.app",
  messagingSenderId: "910817912817",
  appId: "1:910817912817:web:432df54b06e208b7f68650",
  measurementId: "G-2NG5WKL894"
};


const app =initializeApp(firebaseConfig);
export const auth =getAuth(app);
// firebase.initializeApp(firebaseConfig);
// export default firebase;