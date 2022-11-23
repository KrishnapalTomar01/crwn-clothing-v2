import { initializeApp } from "firebase/app";

import {
  getAuth, signInWithRedirect, signInWithPopup,
  signInWithEmailAndPassword, GoogleAuthProvider,
  createUserWithEmailAndPassword, signOut, onAuthStateChanged,
  User, NextOrObserver
} from 'firebase/auth';
import {
  getFirestore, doc, getDoc, setDoc,
  collection, writeBatch, query, getDocs,
  QueryDocumentSnapshot
} from 'firebase/firestore';

import { Category } from "../../store/categories/category.types";

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

export const signInUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password);
}

export const db = getFirestore();

export type ObjectToAdd = {
  title: string;
}

export const addCollectionAndDocuments =
  async<T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });
    await batch.commit();
    console.log('done');
  }

export type AdditionalInfo = {
  displayName?: string;
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}

export const createUserDocumentFromAuth =
  async (userAuth: User, additionalInfo = {} as AdditionalInfo): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
        console.log('error creating the user', error);
      }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>;
  }

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs
    .map(docSnapshot => docSnapshot.data() as Category);
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    )
  })
}