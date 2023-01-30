import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import {
  addNewEmptyNote,
  deleteNoteById,
  noteUpdated,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
} from "./journalSlice";

// creamos el thung para crear una nueva nota
export const startNewNote = () => {
  return async (dispatch, getState) => {
    // Avisamos que estamos guardando la nota
    dispatch(savingNewNote());

    // Buscamos el uid del usuario loggeado del estado
    // console.log(getState());
    const { uid } = getState().auth;

    // cremaos la estructura de la nota
    const newNote = {
      title: "",
      body: "",
      imageUrls: [],
      date: new Date().getTime(),
    };

    // Creamos la referencia en donde queremos guardar la data en firebase con el id del usuario
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    // Guardamos la data
    await setDoc(newDoc, newNote);
    // console.log({ newDoc, setDocResp })

    // Le colocamos el id a la nueva nota
    newNote.id = newDoc.id;

    // Despachamos la nueva nota
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    // Buscamos el uid del usuario loggeado del estado
    const { uid } = getState().auth;

    // Chequeamos si hay usuario
    if (!uid) throw new Error("El UID del usuario no existe!");
    // console.log( uid )

    // Llamamos a la función que trae las notas
    const notes = await loadNotes(uid);

    // Mandamos las notas al redux
    dispatch(setNotes(notes));
  };
};

// creamos metodo para guardar una nota
export const startSaveNote = () => {
  return async (dispatch, getState) => {
    // Avisamos que estamos guardando
    dispatch(setSaving());

    // Buscamos el uid del usuario loggeado del estado
    const { uid } = getState().auth;

    // Buscamos la nota activa
    const { activeNote } = getState().journal;

    // retiramos el id para que cuando modifiquemos la nota no modifique el id de la misma
    const noteToFirestore = { ...activeNote };
    delete noteToFirestore.id;

    // Creamos la referencia al documento que queremos actualizar
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);

    // Guardamos el cambio en la base de datos
    await setDoc(docRef, noteToFirestore, { merge: true }); // merge true actualiza solo los nuevos cambios

    dispatch(noteUpdated(activeNote));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    // Avisamos que estamos guardando al state
    dispatch(setSaving());

    // Subimos los archivos: Primero creamos un arreglo
    const fileUploadPromises = [];

    // Luego al arrelgo le ponemos promesas por la cantidad de archivos a subir
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    // Mandamos todas las promesas de una para que cuando todas se cumplan tengamos la respuesta
    const photosUrls = await Promise.all(fileUploadPromises);

    // console.log( photosUrls )
    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    // Tomamos la nota activa y el id del usuario
    const { uid } = getState().auth;
    const { activeNote } = getState().journal;
    // console.log( { uid, activeNote } )

    // Hacemos la referencia a la imagen que queremos borrar
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);

    // Borramos
    await deleteDoc(docRef);

    // Limpiamos el estado del redux
    dispatch(deleteNoteById(activeNote.id));
  };
};
