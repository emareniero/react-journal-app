import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";

export const AppRouter = () => {
  return (
    <Routes>
        
      {/* Login y registro */}
      <Route path="auth/*" element={ <AuthRoutes/> } />

      {/* Diario */}
      <Route path="/*" element={ <JournalRoutes/> } />

    </Routes>
  );
};
