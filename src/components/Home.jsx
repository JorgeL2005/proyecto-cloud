import React, { useContext } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import Notes from "./Notes";
import Courses from "./Courses";
import AcademicProgress from "./AcademicProgress";
import "../styles/App.css";
import { AuthContext } from "../context/AuthContext"; // Importar el contexto global

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la ruta actual
  const { setAuthData } = useContext(AuthContext); // Obtener la función para limpiar el contexto

  const handleLogout = () => {
    // Limpiar las variables globales (token y role) del contexto
    setAuthData({
      token: null,
      role: null,
      facultad: null
    });
    // Redirigir al formulario de login
    navigate("/login");
  };

  // Verifica si la ruta actual es la página principal de Home
  const isHomePage = location.pathname === "/home";

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
        <ProfileIcon />
        <button onClick={handleLogout} style={{ padding: "10px 15px", cursor: "pointer" }}>
          Logout
        </button>
      </header>

      {/* Renderiza la lista de opciones solo si estás en la página principal */}
      {isHomePage && (
        <nav>
          <ul>
            <li><Link to="notes">Mis Notas</Link></li>
            <li><Link to="courses">Cursos Disponibles</Link></li>
            <li><Link to="progress">Mi Avance académico</Link></li>
          </ul>
        </nav>
      )}

      <div>
        <Routes>
          <Route path="notes" element={<Notes />} />
          <Route path="courses" element={<Courses />} />
          <Route path="progress" element={<AcademicProgress />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
