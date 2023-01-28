import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages"

export const AuthRoutes = () => {
  return (
    <Routes>
        {/* Estas son mis rutas en la pagina de autenticación */}
        <Route path="/login" element={ <LoginPage/> } />
        <Route path="/register" element={ <RegisterPage/> } />

        {/* Esta es la ruta en caso que un path que no corresponde, directamente al login  */}
        <Route path="/*" element={ <Navigate to='/auth/login' /> } />
    </Routes>
  )
}
