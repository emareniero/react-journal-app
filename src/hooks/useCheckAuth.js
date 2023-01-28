import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../firebase/config";

export const useCheckAuth = () => {
  // Tomamos el status del useSelector para ver cual es el usuario que esta activo en firebase
  const { status } = useSelector((state) => state.auth);

  // Desapahcamos el usuario y lo volvemos autenticar
  const dispatch = useDispatch();

  // Usamos el useEffect para evluar si el usuario esta atutenticado
  useEffect(() => {
    // Usamos los métodos de firebase
    onAuthStateChanged(FirebaseAuth, async (user) => {
      // console.log( user )

      // Si no hay usuario
      if (!user) return dispatch(logout());

      // sacamos lo que interesa del user
      const { uid, email, displayName, phoneNumber } = user;

      // Si hay usuario lo logueamos
      dispatch(login({ uid, email, displayName, phoneNumber }));
    });
  }, []);

  return {
    status
  }
};
