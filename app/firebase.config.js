// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyA9M06N90_FZv85eul9sdvhc7NP78huhsc",
	authDomain: "payments-c7140.firebaseapp.com",
	projectId: "payments-c7140",
	storageBucket: "payments-c7140.appspot.com",
	messagingSenderId: "295732506758",
	appId: "1:295732506758:web:650bd1a7a1ef122b892107",
	measurementId: "G-GSKD2R1307",
	databaseURL: "https://payments-c7140-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const database = getDatabase(app);
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);