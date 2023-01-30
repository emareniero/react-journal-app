import { collection, getDocs,  } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid = "") => {
  // Chequeamos que haya uid
  if (!uid) throw new Error("El UID del usuario no existe!");

  // Traemos la colección que necesitamos
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

  // Guardamos la colección en un doc
  const docs = await getDocs( collectionRef )
  // console.log( docs )

  // Creamos un arreglo que va a tener todas las notas
  const notes = [];

  // Para poder traer la data() (que es una función) a la que hace referencia los docs tenemos que hacer lo siguiente
  docs.forEach( doc => {
    // console.log(doc.data())
    notes.push( { id: doc.id, ...doc.data() } )
  } )

  // Devolvemos las notas
  // console.log( notes )
  return notes;
 };
