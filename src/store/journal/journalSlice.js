import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    // active: {
    //     id: 'ABC',
    //     title: '',
    //     body: '',
    //     date: 12334,
    //     imageUrls: [], //https://foto1.jpg
    // }
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {

        savingNewNote: (state) => {
            state.isSaving = true;
        },

        addNewEmptyNode: (state, action) => {

            state.notes.push(action.payload);
            state.isSaving = false;
        },

        setActionNote: (state, action) => {

            state.active = action.payload;
            state.messageSaved = '';


        },

        setNotes: (state, action) => {

            state.notes = action.payload;

        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },

        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {

                if (note.id === action.payload.id) {
                    return action.payload;
                }

                return note
            });


            state.messageSaved = `${action.payload.title}, actualizada correctamente`
        },

        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },

        clearNoteLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },

        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== action.payload);
            
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    addNewEmptyNode,
    clearNoteLogout,
    deleteNoteById, 
    savingNewNote,
    setActionNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions

