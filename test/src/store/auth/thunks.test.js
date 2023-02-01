import { async } from "@firebase/util";
import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../../src/store/auth";
import { checkingAthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../../src/store/journal";
import { demoUser } from "../../../fixtures/authFixtures";

// Creamos funciones ficticias del path que contiene los providers para tener las respuestas
jest.mock("../../../../src/firebase/providers");

describe("pruebas en el thunk de auth", () => {
  // Creamos una función para llamar el dispatch
  const dispatch = jest.fn();

  // Limpiamos los mocjs en cada prueba
  beforeEach(() => jest.clearAllMocks());

  test("debe invocar el checkingCredentials", async () => {
    // const valor = checkingCredentials();
    // console.log( valor )

    // Evaluamos si el cheking chekingAuthentication() esta siendo llamado correctamente
    await checkingAthentication()(dispatch); // El segundo parentesis es lo que regresa la función

    // Vemos si el dispatch fue llamado correctamente
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSignIn debe llamar a checkingCredentials y login", async () => {
    // Creamos la data de login
    const loginData = { ok: true, ...demoUser };

    // Llamamos la función de sign in
    await signInWithGoogle.mockResolvedValue(loginData);

    // Llamamos la función de startSignInWithGoogle que va a llamar la función anterior
    // Thunk
    await startGoogleSignIn()(dispatch);

    // si el login es exitoso esperamos que checking credential haya sido llamado y el tengamos el resutlado de usuario esperado
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSignIn debe llamar a checkingCredentials y logout - error", async () => {
    // Creamos la data de login
    const loginData = { ok: false, errorMessage: "Un error en Google" };

    // Llamamos la función de sign in
    await signInWithGoogle.mockResolvedValue(loginData);

    // Llamamos la función de startSignInWithGoogle que va a llamar la  función anterior
    // Thunk
    await startGoogleSignIn()(dispatch);

    // si el login es exitoso esperamos que checking credential haya sido llamado y el tengamos el resutlado de usuario esperado
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("startCreatingUserWithEmailPassword debe llamar checkingCredentials y login - exito", async () => {
    // tomamos la info del usuario que se va a loguear
    const loginData = { ok: true, ...demoUser };
    // Creamos la data que pondira en el formulario de ingerso a la sesion
    const formData = { email: demoUser.email, password: "123456" };

    // Creamos la carga del usuario
    await loginWithEmailPassword.mockResolvedValue(loginData);

    // Llamamos el thunk respectivo
    await startLoginWithEmailPassword(formData)(dispatch);

    // Chequeamos que haga las cosas bien
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startLogout debe llamar a logoutFirebase, clearNotes y logout", async () => {
    await startLogout()(dispatch);

    // Chequeamos si salio de la sesion
    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
