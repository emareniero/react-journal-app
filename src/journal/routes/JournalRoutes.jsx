import { Navigate, Route, Routes } from "react-router-dom"
import { JournalPage } from "../pages/JournalPage"

export const JournalRoutes = () => {
  return (
    <Routes>
        {/* Esta es la página del journal */}
        <Route path="/" element={ <JournalPage /> } ></Route>

        {/* Cualquier otra ruta me tira al jouernal */}
        <Route path="/*" element={ <Navigate to='/journal/' /> } />
    </Routes>
  )
}
