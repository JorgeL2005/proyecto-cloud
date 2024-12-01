import React, { useState, useContext } from "react";
import axios from "axios";
import "../styles/Carrera.css"; // Archivo CSS para diseño
import { AuthContext } from "../context/AuthContext";
import BackToHomeButton from "./BacktoHomeButton";
import { Link, Routes, Route } from "react-router-dom";
import CrearCarrera from "./CrearCarrera";

const Carrera = () => {
  const { authData } = useContext(AuthContext); // Obtener el token y rol desde el contexto
  const [programId, setProgramId] = useState(""); // Estado para almacenar el program_id
  const [carreraData, setCarreraData] = useState(null); // Estado para almacenar los datos de la carrera
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar errores

  const handleConsultar = async () => {
    if (!programId) {
      setErrorMessage("Por favor ingresa el ID de la carrera.");
      return;
    }

    try {
      const response = await axios.post(
        "https://jni3djrkie.execute-api.us-east-1.amazonaws.com/prod/program/consultar",
        {
          tenant_id: authData.facultad, // Usar tenant_id desde el contexto
          program_id: programId,
        },
        {
          headers: {
            Authorization: authData.token, // Enviar token en el header
          },
        }
      );

      if (response.data.body) {
        setCarreraData(response.data.body); // Guardar los datos de la carrera
        setErrorMessage(""); // Limpiar errores
      } else {
        setCarreraData(null);
        setErrorMessage("Carrera no encontrada.");
      }
    } catch (error) {
      console.error("Error al consultar la carrera:", error);
      setCarreraData(null);
      setErrorMessage("No se pudo obtener la información de la carrera. Inténtalo más tarde.");
    }
  };

  return (
    <div className="carrera-container">
      <Routes>
        <Route path="crear" element={<CrearCarrera />} />
        <Route
          path="/"
          element={
            <>
              <h2>Consultar Carrera</h2>
              <div className="form-group">
                <label htmlFor="programId">ID de la Carrera:</label>
                <input
                  type="text"
                  id="programId"
                  value={programId}
                  onChange={(e) => setProgramId(e.target.value)}
                  placeholder="Ejemplo: DS"
                  required
                />
              </div>
              <button className="consultar-button" onClick={handleConsultar}>
                Consultar
              </button>

              {authData.role === "admin" && (
                <Link to="crear" className="crear-carrera-link">
                  <button className="crear-carrera-button">Crear Carrera</button>
                </Link>
              )}

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              {carreraData && (
                <div className="carrera-details">
                  <h3 className="program-name">{carreraData.program_name}</h3>
                  <p><strong>ID de Carrera:</strong> {carreraData.carrera_id}</p>
                  <p><strong>Créditos Requeridos:</strong> {carreraData.credits_required}</p>
                  <p><strong>Creado el:</strong> {carreraData.created_at}</p>
                  <h4>Cursos por Nivel:</h4>
                  <div className="courses-by-level">
                    {Object.entries(carreraData.courses_by_level).map(([level, courses]) => (
                      <div className="level-section" key={level}>
                        <h5>Nivel {level}</h5>
                        {Array.isArray(courses) ? (
                          <ul>
                            {courses.map((course) => (
                              <li key={course}>{course}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{courses}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <BackToHomeButton />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default Carrera;
