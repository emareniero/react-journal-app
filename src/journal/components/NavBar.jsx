import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";

export const NavBar = ({ drawerWidth = 240 }) => {
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
          <MenuOutlined></MenuOutlined>
        </IconButton>

        <Grid container direction='row' justifyContent='space-between' alignItems='center' >
            <Typography variant="h6" noWrap component='div' > Journal App </Typography>

            <IconButton color="error">
                <LogoutOutlined></LogoutOutlined>
            </IconButton>
        </Grid>

      </Toolbar>
    </AppBar>
  );
};
