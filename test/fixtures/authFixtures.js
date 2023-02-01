export const initialState = {
  status: "checking", // checking, not-authenticated, authenticated
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState = {
  status: "authenticated", // checking, not-authenticated, authenticated
  uid: "123abc",
  email: "pruebas@gmail.com",
  displayName: "Pruebas User",
  photoURL: "https://prueba.jpg",
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: "not-authenticated", // checking, not-authenticated, authenticated
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const demoUser = {
  uid: "ABC123",
  email: "demo@gmail.com",
  displayName: "Demo User",
  photoURL: "https://demo.jpg",
};
