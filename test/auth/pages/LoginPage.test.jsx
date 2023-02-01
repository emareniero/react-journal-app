import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { notAuthenticatedState } from "../../fixtures/authFixtures";


const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword( { email, password } ); 
    },
}))

// Sobreescribimos la librearía para hacer solo mock del dispatch
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),  // esto es asi porque en nuestro caso el sidpacth recibe una función que llama a otra función
}))

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  }
});

describe("Pruebas en el < LoginPage />", () => {

    beforeEach(() => jest.clearAllMocks( ) ); // NUNCA OLVIDAR ESTO!

  test("debe mostrar el componente correctamente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // screen.debug()
    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  test("botón de Google debe llamar el startGoogleSignIn", () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    
    // screen.debug()
    // console.log( store.getState() );
    
    // Tomamos el boton del screen
    const googleBtn = screen.getByLabelText('google-btn');
    // console.log( googleBtn )
    fireEvent.click( googleBtn );
    
    // console.log( store.getState() );
    
    // Verificamos que el startGoogleSignIn haya sido llamado
    expect( mockStartGoogleSignIn ).toHaveBeenCalled();
});

test('submit debe llamar el startLoginWithEmailPassword', () => {

    const email     = 'ereniero@gmail.com'
    const password  = '123456'
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'Correo' } );
    fireEvent.change( emailField, { target: { name: 'email', value: email } } );
    
    const passwordField = screen.getByTestId('password')
    fireEvent.change( passwordField, { target: { name: 'password', value: password } } );
    
    const loginForm = screen.getByLabelText('submit-form')
    fireEvent.submit( loginForm );

    // Chequeamos
    expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
        email: email, // Recordar que se podría poner solo email
        password: password, // Recordar que se podría poner solo password
    }) 

})


});
