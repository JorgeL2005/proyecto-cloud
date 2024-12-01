import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../styles/Matricula.css"; // Archivo CSS para estilos personalizados
import BackToHomeButton from "./BacktoHomeButton";
import Matricularse from "./Matricularse";
import ConsultarMatricula from "./ConsultarMatricula";
import EliminarMatricula from "./EliminarMatricula";

const Matricula = () => {
  return (
    <div className="matricula-container">
      <Routes>
        {/* Rutas para cada acción */}
        <Route path="matricularse" element={<Matricularse />} />
        <Route path="consultar" element={<ConsultarMatricula />} />
        <Route
          path="/"
          element={
            <div className="matricula-actions">
              <h2>Gestión de Matrícula</h2>
              <div className="button-group">
                <Link to="matricularse" className="action-link">
                  <button className="action-button">Matricularse</button>
                </Link>
                <Link to="consultar" className="action-link">
                  <button className="action-button">Consultar Matrícula</button>
                </Link>
              </div>
              <BackToHomeButton />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default Matricula;
