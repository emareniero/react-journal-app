import { collection, deleteDoc, getDocs  } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../../src/store/journal/thunks";

describe("Pruebas en los journalThunks.js", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("startNewNote debe crear un nueva nota en blanco", async () => {
    const uid = "TEST-UID";
    getState.mockReturnValue({ auth: { uid: uid } });

    // llamamos a la función startNewNote
    await startNewNote()(dispatch, getState);

    // // Realizamos los test
    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: "",
        title: "",
        imageUrls: expect.any(Array),
        id: expect.any(String),
        date: expect.any(Number),
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: "",
        title: "",
        imageUrls: expect.any(Array),
        id: expect.any(String),
        date: expect.any(Number),
      })
    );

    // Borramos los datos de la base de datos
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs( collectionRef );
    // console.log( docs )
    const deletePromises = [];
    docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) )

    await Promise.all( deletePromises )

  }, 20000);
});
