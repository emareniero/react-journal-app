import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

// Creamos una nueva instancia del proveedor de autenticación de google
const googleProvider = new GoogleAuthProvider();

// Creamos la funcioón de sign in con google
export const signInWithGoogle = async () => {
  try {
    // mandamos nuestra instancia google
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    // traemos el usuario del resultado
    // const user = result.user;
    const { displayName, email, photoURL, uid } = result.user;
    // console.log( { user } )

    return {
      ok: true,
      // User info
      displayName,
      email,
      photoURL,
      uid,
    };

    // // Esto es un ejemplo de otra informaciòn que se puede obterner de google sobre el usuario
    // const credentials = GoogleAuthProvider.credentialFromResult( result );
    // console.log( credentials )
  } catch (error) {
    // console.log(error);

    // Handle Errors here.
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};

// Creamos los métodos para registrarse con nombre, mail y password
export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
  // Usamos un try catch por si algo sale mal ya que esto es un registro a una base de datos de firebase
  try {
    // Intentamos hacer la creación de un usuario usando los metodos de firebase
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    // console.log(resp);
    const { uid, photoURL } = resp.user;

    // TODO: Actualizar el displayName en Firebase
    await updateProfile(FirebaseAuth.currentUser, { displayName }); // FirebaseAuth.currentUser nos permite saber cual es el usuario loggeado actualmente

    // Si todo sale vien devolvermos el ok
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    // Avisamos si algo sale mal
    // console.log( error )
    return { ok: false, errorMessage: error.message };
  }
};

// Creamos la función de login de email y password
export const loginWithEmailPassword = async ({ email, password }) => {
  // Vamos a usar un try catch por si algo sale mal
  try {
    // Vamos a llamar al método propio de firebase para logearse
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL, displayName } = resp.user;
    // console.log(resp);

    // Si todo sale vbien mandamos un ok
    return { ok: true, uid, photoURL, displayName };
  } catch (error) {
    // Si por algun motivo no se puedo loggear vemos que ha pasado
    // console.log( error )
    return { ok: false, errorMessage: error.message };
  }
};

// Función para cerrar la cuenta
export const logoutFirebase = async () => {
  // Esto cierra todo, google, correo, etc.
  return await FirebaseAuth.signOut();
};
