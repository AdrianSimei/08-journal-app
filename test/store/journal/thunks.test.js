import { startNewNote } from "../../../src/store/journal/thunks";

describe('Pruebas en thunks', () => {

    afterEach(() => jest.clearAllMocks());
    const dispatch = jest.fn();
    const getState = jest.fn();


    test('startNewNote debe crear una nueva nota', async () => {
        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid } });
        await startNewNote()(dispatch, getState);

    }, 10000);

});