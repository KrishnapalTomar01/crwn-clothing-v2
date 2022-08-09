import { initializeApp } from "firebase/app";

import {
  getAuth, signInWithRedirect, signInWithPopup,
  signInWithEmailAndPassword, GoogleAuthProvider,
  createUserWithEmailAndPassword, signOut, onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAME0fVfsNd902nh9DGYzVuDfMf7HO8tCs",
  authDomain: "crwn-clothing-d36f7.firebaseapp.com",
  projectId: "crwn-clothing-d36f7",
  storageBucket: "crwn-clothing-d36f7.appspot.com",
  messagingSenderId: "555503556503",
  appId: "1:555503556503:web:b2ed4bc249f67fce47d6d2"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password);
}

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInfo });
    }
    catch (error) {
      console.log(error);
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);