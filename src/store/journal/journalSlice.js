import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    activeNote: null,
    // activeNote: {
    //     id: '1234',
    //     title: '',
    //     body: '',
    //     date: 1234323,
    //     imageUrls: [], // https://foto1.jgp, https://foto2.jgp, https://foto3.jgp, https://foto4.jgp
    // }
  },
  reducers: {
    savingNewNote: (state) => {
      // Cuando apretamos el boton ponemos que estamos guardando la nota
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      // Colocamos la nota
      state.notes.push(action.payload);

      // Todavía no guardamos la nota
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      // Avtiamos la nota que hemos creado
      state.activeNote = action.payload;
      state.messageSaved = "";
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    noteUpdated: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }

        return note;
      });

      // Avisamos que la nota se actualizo correctamente
      state.messageSaved = `${action.payload.title}, actualizada correctamente!`;
    },
    setPhotosToActiveNote: (state, action) => {
      state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.activeNote = null;
    },
    deleteNoteById: (state, action) => {
      state.activeNote = null;

      state.notes = state.notes.filter((note) => note.id !== action.payload );

      
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearNotesLogout,
  setPhotosToActiveNote,
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  noteUpdated,
  deleteNoteById,
} = journalSlice.actions;
