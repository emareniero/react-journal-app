import { async } from "@firebase/util";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./";

export const checkingAthentication = (email, Password) => {
  return async (dispatch) => {
    // Mandamos a avisar que se esta verificando el usuario
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    // Mandamos a avisar que se esta verificando el usuario
    dispatch(checkingCredentials());

    // Llamamos el inicio de sesión con google
    const result = await signInWithGoogle();
    // console.log( { result } )

    // Si no sale bien mandamos el error
    if (!result.ok) return dispatch(logout(result.errorMessage));

    // Mandamos el usuario si todo sale bien al depachante de aduana
    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    // Mandamos a avisar que se esta verificando el usuario
    dispatch(checkingCredentials());

    // Mandamos a registrar el usuario en el proveedor
    const result = await registerUserWithEmailPassword({ email, password, displayName });
    //  console.log( resp )

    // Si no sale bien mandamos el error
    if (!result.ok) return dispatch(logout(result.errorMessage));

    // Si todo sale bien logueamos al user
    dispatch(login(result));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    // console.log( {email, password })

    // Mandamos a avisar que no estamos logueando
    dispatch(checkingCredentials());

    // Mandamos a loguear el usuario a firebase
    const result = await loginWithEmailPassword({ email, password });

    // Si hay algún problema mandamos el logout
    if (!result.ok) return dispatch(logout(result));

    // Si se logueo correctamente mandams el login
    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    // Llamamos la acción de cerrar sesion de firebase
    await logoutFirebase();

    // Mandmaos el logout
    dispatch( logout( {  } ) );
  };
};
