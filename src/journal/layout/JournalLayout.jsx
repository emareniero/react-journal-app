import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { NavBar, Sidebar } from "../components";

export const JournalLayout = ({ children }) => {
  // Con la siguiente constante vamos a definir el tamñano de nuestra barra lateral
  const drawerWidth = 240;

  return (
    <>
      <Box sx={{ display: "flex" }} className="animate__animated animate__fadeIn">
        {/* Navbar drawerWidth */}
        <NavBar drawerWidth={drawerWidth}></NavBar>

        {/* SideBar drawerWidth */}
        <Sidebar drawerWidth={drawerWidth}></Sidebar>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Toolbar  */}
          <Toolbar />

          {children}
        </Box>
      </Box>
    </>
  );
};
