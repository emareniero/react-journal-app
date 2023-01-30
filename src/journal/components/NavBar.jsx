import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth";

export const NavBar = ({ drawerWidth = 240 }) => {

  // usamos el dispach para hacer el log out
  const dispach = useDispatch();

  // Desconectamos el usuario de firebase
  const onLogout = () => {
    // console.log("onLogout");
    dispach(startLogout());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` }, // En pantallas grandes que no ocupe todo
        ml: { sm: `${drawerWidth}` }, // En pantañas pequeñas el margen de la izquierda sea 240
      }}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" sx={{ mr: 2, display: { sm: "none" } }}>
          <MenuOutlined/>
        </IconButton>

        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" noWrap component="div">
            {" "}
            Journal App{" "}
          </Typography>

          <IconButton color="error" onClick={onLogout}>
            <LogoutOutlined/>
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
