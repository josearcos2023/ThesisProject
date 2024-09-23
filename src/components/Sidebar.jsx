const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Botón de nuevo chat */}
      <button className="new-chat-btn">+ Nuevo Chat</button>

      {/* Lista de opciones en el centro */}
      <ul>
        {/* Otras opciones pueden ir aquí si es necesario */}
      </ul>

      {/* Sección de cuenta y cierre de sesión en la parte inferior */}
      <div className="account-section">
        <div>Mi Cuenta</div>
        <div className="logout">Cerrar Sesión</div>
      </div>
    </div>
  );
};

export default Sidebar;

