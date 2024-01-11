
import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { checkinCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkInAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNoteLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";


jest.mock('../../../src/firebase/providers')

describe('Pruebas en thunks', () => {
    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('Debe invocar en el checking credentials', async () => {
        await checkInAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkinCredentials())

    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login', async () => {

        const loginData = {
            ok: true,
            ...demoUser
        };

        await signInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkinCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });
    test('startGoogleSignIn debe de llamar checkingCredentials y logout con mensaje de error', async () => {

        const loginData = {
            ok: false,
            errorMessage: 'un error en google'
        };

        await signInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkinCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
    });

    test('startLoginWithEmailPassword', async () => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' }


        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkinCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    });

    test('startLogout debe llamar logoutFirebase', async() => {

        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNoteLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());

    })

});