// Importamos el link como router link para no tener conflictos con el link de MUI
import { Link as RouterLink } from "react-router-dom";

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth";

// creamos un data inicial para el form
const formData = {
  displayName: "",
  email: "",
  password: "",
};

// Validaciones personalizadas para el form del form
const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe tener un @"],
  password: [(value) => value.length >= 6, "El password debe tener mas de 6 letras"],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
};

export const RegisterPage = () => {
  // USamos el useSelector para tomar el estado de nuestro store}
  const { status, errorMessage } = useSelector((state) => state.auth);
  // console.log(algo);

  // Cremamos un metodo para que no se pueda volver a regustrar si ya esta registrado o se esta autenticando
  const isCheckingAuthentication = useMemo(() => status === "checking", [status]);

  // Creamos el despachador para enviar a crear el usuario
  const dispatch = useDispatch();

  // Creamos un estado inicial para que cuando la persona entre por primera vez a la pagin de creacion de cuenta no vea todo rojo
  const [formSubmited, setFormSubmited] = useState(false);

  // Cremaos el formato del form usando nuestro hook personalizado
  const { formState, displayName, email, password, onInputChange, onResetForm, isFormValid, displayNameValid, emailValid, passwordValid } =
    useForm(formData, formValidations);

  // Creamos el formulario
  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(formState);

    // Ponemos el formSubmited en true una vez que se envio el formulario
    setFormSubmited(true);

    // Si el formulario NO es vválido no vamos a enviar nada
    if (!isFormValid) return;

    // Despachamos la creación del usuario y le mandamos el estado del formulario
    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre Completo"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmited}
              helperText={displayNameValid}
            ></TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmited}
              helperText={emailValid}
            ></TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
            ></TextField>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth type="submit" disabled={isCheckingAuthentication}>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
