// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAME0fVfsNd902nh9DGYzVuDfMf7HO8tCs",
  authDomain: "crwn-clothing-d36f7.firebaseapp.com",
  projectId: "crwn-clothing-d36f7",
  storageBucket: "crwn-clothing-d36f7.appspot.com",
  messagingSenderId: "555503556503",
  appId: "1:555503556503:web:b2ed4bc249f67fce47d6d2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const {displayName, email } = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef, {displayName,email, createdAt });
    }catch(error){
      console.log(error);
    }
  }

  return userDocRef;
}