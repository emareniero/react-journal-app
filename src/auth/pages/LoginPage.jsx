import { useMemo } from "react";
// Importamos el link como router link para no tener conflictos con el link de MUI
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";

const formData = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  // Tomamos el estado del useSelector
  const { status, errorMessage } = useSelector((state) => state.auth);

  // Buscamos el despachador
  const dispatch = useDispatch();

  // Cremaos el formato del form usando nuestro hook personalizado
  const { email, password, onInputChange, formState } = useForm(formData);

  // Vemos si se esta autenticando y guardamos con un useMemo que solo cambiara si cambia el status y no cada vez que el componente se renderiza
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  // creamos la función del formulario
  const onSubmit = (event) => {
    event.preventDefault();
    // console.log( formState )

    dispatch(startLoginWithEmailPassword({ email, password }));

    // console.log({ email, password });
    // NO es esta la acción a despachar
    // dispatch(checkingAthentication());
  };

  // Creamos el googleSignin
  const onGoogleSignIn = () => {
    // console.log("On Google Sign In");
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form aria-label="submit-form" onSubmit={onSubmit} className="animate__animated animate__fadeIn">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              inputProps={{
                // Esto se usa para testing
                "data-testid": "password",
              }}
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth type="submit" disabled={isAuthenticating}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button aria-label="google-btn" variant="contained" fullWidth onClick={onGoogleSignIn} disabled={isAuthenticating}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
