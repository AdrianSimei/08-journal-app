import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseaAuth } from "./config";

const googleProvider = new GoogleAuthProvider();



export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseaAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);

        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // user Info
            displayName, email, uid, photoURL
        }


    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseaAuth, email, password);
        const { uid, photoURL } = resp.user;

        //TODO: actualizar el usuario En FIREBASE
        await updateProfile(FirebaseaAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {

        console.log(error);
        return { ok: false, errorMessage: error.message }
    }
}

export const loginWithEmailPassword = async ({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseaAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}



export const logoutFirebase = async () => {

    return await FirebaseaAuth.signOut();

}










