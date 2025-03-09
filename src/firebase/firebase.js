import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAcBLg0QgNZfAUGh44rsOlmYp4SqXI8bY",
  authDomain: "otp-authenticator-29c81.firebaseapp.com",
  projectId: "otp-authenticator-29c81",
  storageBucket: "otp-authenticator-29c81.firebasestorage.app",
  messagingSenderId: "910817912817",
  appId: "1:910817912817:web:432df54b06e208b7f68650",
  measurementId: "G-2NG5WKL894"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);