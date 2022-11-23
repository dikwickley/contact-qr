import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  // apiKey: "AIzaSyDwzY9Kv31HPX7I7bofUu_TwGAbDTVQGSU",
  // authDomain: "quizapp-3caa2.firebaseapp.com",
  // projectId: "quizapp-3caa2",
  // storageBucket: "quizapp-3caa2.appspot.com",
  // messagingSenderId: "905898688557",
  // appId: "1:905898688557:web:9d2da5546c69335333b8a4",
  //contact-qr app
  apiKey: "AIzaSyDhSZGg9hZQxgy5TKUC7LvCj3lcu0VvKNM",
  authDomain: "contact-qr.firebaseapp.com",
  projectId: "contact-qr",
  storageBucket: "contact-qr.appspot.com",
  messagingSenderId: "47440429263",
  appId: "1:47440429263:web:c9e01c004689829aa4f7ba",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// window.recaptchaVerifier = new RecaptchaVerifier(
//   "sign-in-button",
//   {
//     size: "invisible",
//     callback: (response) => {
//       // reCAPTCHA solved, allow signInWithPhoneNumber.
//       onSignInSubmit();
//     },
//   },
//   auth
// );

export { auth };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
