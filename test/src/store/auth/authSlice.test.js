import { authSlice, checkingCredentials, login, logout } from "../../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../../fixtures/authFixtures";

describe("Pruebas en el authSlice.js", () => {
  test('debe regresar el estado inicial y llamarse "auth"', () => {
    // Le mandamos el estado inicial al authSlice
    const state = authSlice.reducer(initialState, {});

    // Evaluamos si el authSlice se llama auth
    expect(authSlice.name).toBe("auth");

    // Evaluamos que sea el que esperabamos
    expect(state).toEqual(initialState);
  });

  test("debe realizar la atuenticación", () => {
    // console.log( login( demoUser ) )

    // Le mandamos al authSlice un usuario demo que se loguea
    const state = authSlice.reducer(authenticatedState, login(demoUser));
    // console.log(state);

    // Vemos si se ha logueado correctamente
    expect(state).toEqual({
      status: "authenticated", // checking, not-authenticated, authenticated
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test("debe realizar el logout sin argumentos", () => {
    // Le mandamos un usuario al authSlice para autenticarlo
    authSlice.reducer(authenticatedState, login(demoUser));

    // Ahora mandamos el logut del usuario
    const state = authSlice.reducer(notAuthenticatedState, logout());
    // console.log(state);

    // Ahora chequeamos is cmabio el estado a no loggueado
    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
    });
  });

  test("debe realizar el logout y mostrar un mensaje de error", () => {
    // Mandamos un mensaje de error
    const errorMessage = "Credenciales incorrectas";

    // Ahora mandamos el logut del usuario
    const state = authSlice.reducer(notAuthenticatedState, logout({ errorMessage }));

    // Ahora chequeamos is cmabio el estado a no loggueado
    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage,
    });
  });

  test("debe cambiar el estado a checking", () => {
    // Mandamos el estado de checking
    const state = authSlice.reducer(authenticatedState, checkingCredentials());

    // Fijemos que este chequeando el estado
    expect(state.status).toBe("checking");
  });
});
