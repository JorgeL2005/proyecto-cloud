import React, { useContext } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import Notes from "./Notes";
import Courses from "./Courses";
import AcademicProgress from "./AcademicProgress";
import "../styles/Home.css"; // Archivo CSS actualizado
import { AuthContext } from "../context/AuthContext"; // Importar el contexto global

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthData } = useContext(AuthContext);

  const handleLogout = () => {
    setAuthData({
      token: null,
      role: null,
      facultad: null,
    });
    navigate("/login");
  };

  const isHomePage = location.pathname === "/home";

  return (
    <div className="home-background">
      <header className="home-header">
        <div className="profile-container">
          <ProfileIcon />
          <h1>Bienvenido al sistema académico!</h1>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {isHomePage && (
        <div className="home-container">
          <div className="home-section">
            <Link to="notes" className="home-link">
              <h2>Mis Notas</h2>
              <p>Consulta tus calificaciones por periodo académico.</p>
            </Link>
          </div>
          <div className="home-section">
            <Link to="courses" className="home-link">
              <h2>Cursos Disponibles</h2>
              <p>Explora los cursos activos y sus detalles.</p>
            </Link>
          </div>
          <div className="home-section">
            <Link to="progress" className="home-link">
              <h2>Mi Avance Académico</h2>
              <p>Revisa tu progreso académico y tus logros.</p>
            </Link>
          </div>
        </div>
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
