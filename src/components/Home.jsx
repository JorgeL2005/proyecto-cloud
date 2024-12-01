import React, { useContext } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import Notes from "./Notes";
import Courses from "./Courses";
import Matricula from "./Matricula";
import Fail from "./Fail";
import Perfil from "./Perfil";
import AvanceAcademico from "./AvanceAcademico";
import Carrera from "./Carrera"; // Importar el nuevo componente
import "../styles/Home.css"; // Archivo CSS actualizado
import { AuthContext } from "../context/AuthContext";

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
            <Link to="matricula" className="home-link">
              <h2>Matricula</h2>
              <p>Matriculate en los cursos que quieras.</p>
            </Link>
          </div>
          <div className="home-section">
            <Link to="fail" className="home-link">
              <h2>Riesgo Académico</h2>
              <p>Revisa en qué cursos necesitas mejorar.</p>
            </Link>
          </div>
          <div className="home-section">
            <Link to="avance" className="home-link">
              <h2>Avance Académico</h2>
              <p>Revisa tu progreso por niveles académicos.</p>
            </Link>
          </div>
          <div className="home-section">
            <Link to="carrera" className="home-link">
              <h2>Carrera</h2>
              <p>Explora detalles sobre tu carrera académica.</p>
            </Link>
          </div>
        </div>
      )}

      <div>
        <Routes>
          <Route path="notes/*" element={<Notes />} />
          <Route path="courses" element={<Courses />} />
          <Route path="matricula/*" element={<Matricula />} />
          <Route path="fail" element={<Fail />} />
          <Route path="profile" element={<Perfil />} />
          <Route path="avance" element={<AvanceAcademico />} />
          <Route path="carrera/*" element={<Carrera />} /> {/* Ruta para Carrera */}
        </Routes>
      </div>
    </div>
  );
};

export default Home;
