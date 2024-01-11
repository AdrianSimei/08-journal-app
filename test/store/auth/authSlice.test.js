import { authSlice, checkinCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Prubas en el authSlice', () => {

    test('Debe regresar el estado inicial y llamarse "auth" ', () => {

        expect(authSlice.name).toBe('auth');
        const state = authSlice.reducer(initialState, {});


        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');

    });

    test('Debe realizar la autenticación', () => {
        const state = authSlice.reducer(initialState, login(demoUser))
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
    });

    test('Debe realizarel logout sin argumentos', () => {
        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        })

    })


    test('Debe realizarel logout  y mostrar mensajes de error', () => {

        const errorMessage = 'credenciales no son correctas'

        const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });
    });

    test('Debe cambiar el estado a checking', () => {
        const state = authSlice.reducer(authenticatedState, checkinCredentials());
        expect(state.status).toBe('checking');
    });

});