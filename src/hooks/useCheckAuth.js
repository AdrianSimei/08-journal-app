import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { FirebaseaAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {

    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(FirebaseaAuth, async (user) => {
            if (!user) return dispatch(logout());
            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }))
            dispatch(startLoadingNotes());
        })
    }, []);

    return status;

}
