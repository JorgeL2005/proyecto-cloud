import React, { useState, useContext } from "react";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "../styles/Notes.css"; // Archivo para personalizar los estilos
import { AuthContext } from "../context/AuthContext"; // Importar el contexto global
import CrearNote from "./CrearNote";
import DeleteNote from "./DeleteNote";
import BackToHomeButton from "./BacktoHomeButton";

const Notes = () => {
  const [periodo, setPeriodo] = useState(""); // Estado para almacenar el período académico
  const [notas, setNotas] = useState([]); // Estado para almacenar las notas obtenidas
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar errores
  const { authData } = useContext(AuthContext); // Obtener el token y rol desde AuthContext

  const handleConsultar = async () => {
    if (!periodo) {
      setErrorMessage("Por favor selecciona un período académico.");
      return;
    }

    try {
      const response = await axios.post(
        "https://ztxrx0s62d.execute-api.us-east-1.amazonaws.com/prod/notas/NotasPorPeriodo",
        { periodo },
        {
          headers: {
            Authorization: authData.token, // Enviar el token en el header
          },
        }
      );

      if (response.data.body && response.data.body.notas) {
        setNotas(response.data.body.notas); // Actualizar las notas obtenidas
        setErrorMessage(""); // Limpiar mensaje de error
      } else {
        setNotas([]);
        setErrorMessage("No se encontraron notas para el período seleccionado.");
      }
    } catch (error) {
      console.error("Error al obtener las notas:", error);
      setErrorMessage("No se pudieron obtener las notas. Inténtalo más tarde.");
    }
  };

  return (
    <div className="notes-container">
      <Routes>
        {/* Ruta para la pantalla de creación de notas */}
        <Route path="create" element={<CrearNote />} />
        {/* Ruta para la pantalla de eliminación de notas */}
        <Route path="delete" element={<DeleteNote />} />
        {/* Ruta para la visualización principal de notas */}
        <Route
          path="/"
          element={
            <>
              <h2>Consultar Notas</h2>
              <div className="select-box">
                <label htmlFor="periodo">Selecciona el período académico:</label>
                <select
                  id="periodo"
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                >
                  <option value="">-- Selecciona --</option>
                  <option value="2024-1">2024-1</option>
                  <option value="2024-2">2024-2</option>
                  <option value="2025-1">2025-1</option>
                </select>
                <button onClick={handleConsultar}>Consultar</button>
              </div>

              {authData.role === "teacher" && (
                <div className="teacher-buttons">
                  <Link to="create" className="action-link">
                    <button className="action-button">Crear Nota</button>
                  </Link>
                  <Link to="delete" className="action-link">
                    <button className="action-button">Eliminar Nota</button>
                  </Link>
                </div>
              )}

              {errorMessage && (
                <p className="error-message">{errorMessage}</p>
              )}

              <div className="notas-list">
                {notas.map((nota) => (
                  <div key={nota.curso_id} className="nota-card">
                    <h3>Curso ID: {nota.curso_id}</h3>
                    <p>Nota: {nota.grade}</p>
                  </div>
                ))}
              </div>
            </>
          }
        />
      </Routes>
      <BackToHomeButton />
    </div>
  );
};

export default Notes;
