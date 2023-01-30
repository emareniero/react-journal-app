import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { NavBar, Sidebar } from "../components";

// Con la siguiente constante vamos a definir el tamñano de nuestra barra lateral
const drawerWidth = 240;

export const JournalLayout = ({ children }) => {

  return (
      <Box sx={{ display: "flex" }} className="animate__animated animate__fadeIn">
        {/* Navbar drawerWidth */}
        <NavBar drawerWidth={drawerWidth} />

        {/* SideBar drawerWidth */}
        <Sidebar drawerWidth={drawerWidth} />

        <Box 
          component="main" 
          sx={{ flexGrow: 1, p: 3 }}>
          {/* Toolbar  */}
          <Toolbar />

          {children}
        </Box>
      </Box>
  );
};
