import React, { useState } from "react";
import { Button, Box } from "@mui/material";

const Sidebar = () => {
  const  [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="sidebar">
      {/* Botón de nuevo chat */}
      <Button className="new-chat-btn">+ Nuevo Chat</Button>

      {/* Lista de opciones en el centro */}
      <ul>
        {/* Otras opciones pueden ir aquí si es necesario */}
      </ul>

      {/* Sección de cuenta y cierre de sesión en la parte inferior */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Button href="#" variant="contained" className="account">
          Mi Cuenta
        </Button>
        <Button variant="outlined" className="logout">
          Cerrar Sesión
        </Button>
        <Button variant="contained" color="primary" onClick={toggleDarkMode}>
          {darkMode ? "Modo Oscuro" : "Modo Claro"}
        </Button>
      </Box>
    </div>
  );
};

export default Sidebar;

