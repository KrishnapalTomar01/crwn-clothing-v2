import { takeLatest, call, all, put } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess } from "./user.action";
import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup, 
    signInUserWithEmailAndPassword, createAuthUserWithEmailAndPassword, signOutUser } from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalInfo);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
    catch (error) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    }
    catch (error) {
        yield put(signInFailed(error));
    }
}

export function* googleSignInAsync() {
    try {
        const userCredential = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, userCredential.user);
    }
    catch (error) {
        yield put(signInFailed(error));
    }
}

export function* emailSignInAsync({ payload: { email, password } }) {
    try {
        const userCredential = yield call(signInUserWithEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth, userCredential.user);
    }
    catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signUpAsync({ payload: { email, password, displayName } }) {
    try {
        const {user} = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, { displayName }));
    }
    catch(error) {
        yield put(signUpFailed(error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOutAsync() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch(error){
        yield put(signOutFailed(error));
    }
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutAsync);
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpAsync);
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, googleSignInAsync);
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailSignInAsync);
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSagas() {
    yield all([call(onCheckUserSession), call(onGoogleSignInStart), 
        call(onEmailSignInStart), call(onSignUpStart), call(onSignUpSuccess), call(onSignOutStart)])
}