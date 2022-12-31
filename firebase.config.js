import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
// const firebaseConfig = {
//   // apiKey: "AIzaSyDwzY9Kv31HPX7I7bofUu_TwGAbDTVQGSU",
//   // authDomain: "quizapp-3caa2.firebaseapp.com",
//   // projectId: "quizapp-3caa2",
//   // storageBucket: "quizapp-3caa2.appspot.com",
//   // messagingSenderId: "905898688557",
//   // appId: "1:905898688557:web:9d2da5546c69335333b8a4",
//   //contact-qr app
//   apiKey: "AIzaSyDhSZGg9hZQxgy5TKUC7LvCj3lcu0VvKNM",
//   authDomain: "contact-qr.firebaseapp.com",
//   projectId: "contact-qr",
//   storageBucket: "contact-qr.appspot.com",
//   messagingSenderId: "47440429263",
//   appId: "1:47440429263:web:c9e01c004689829aa4f7ba",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAVDdmKWcaC9p0fEWD65cgxPIxchL1-0YU",
  authDomain: "bvmpjc-58b2c.firebaseapp.com",
  projectId: "bvmpjc-58b2c",
  storageBucket: "bvmpjc-58b2c.appspot.com",
  messagingSenderId: "709595368311",
  appId: "1:709595368311:web:7f2d2c6f7a43d520bd2f72",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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

export { auth, db };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
