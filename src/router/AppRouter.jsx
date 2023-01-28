import { Navigate, Route, Routes } from "react-router-dom";

import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CheckingAuth } from "../ui";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
 
  // usamos un custom hooo para evluar el estado del usuario
  const { status } = useCheckAuth(); 

  // Chequemaos si esta alguien loggeado
  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>

    {
      status === 'authenticated'
        ? <Route path="/*" element={<JournalRoutes />} />
        : <Route path="/auth/*" element={<AuthRoutes />} />
    }

    <Route path="/*" element={ <Navigate to='/auth/login' /> }></Route>

      {/* Login y registro */}
      {/* <Route path="auth/*" element={<AuthRoutes />} /> */}

      {/* Diario */}
      {/* <Route path="/*" element={<JournalRoutes />} /> */}
    </Routes>
  );
};
