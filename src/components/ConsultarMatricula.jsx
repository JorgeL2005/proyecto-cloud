import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ConsultarMatricula.css"; // Asegúrate de tener el archivo CSS para estilos personalizados
import { AuthContext } from "../context/AuthContext";

const ConsultarMatricula = () => {
  const { authData } = useContext(AuthContext); // Obtener el token y tenant desde AuthContext
  const [userId, setUserId] = useState("");
  const [period, setPeriod] = useState("");
  const [matricula, setMatricula] = useState(null); // Estado para almacenar la matrícula
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para redirigir al usuario

  const handleConsultar = async () => {
    if (!userId || !period) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await axios.post(
        "https://8h7cdypcz0.execute-api.us-east-1.amazonaws.com/prod/matricula/consultar",
        {
          tenant_id: authData.facultad, // Usar la variable global facultad como tenant_id
          user_id: userId,
          period,
        },
        {
          headers: {
            Authorization: authData.token, // Agregar el token en el header
          },
        }
      );

      if (response.data.body) {
        setMatricula(response.data.body); // Actualizar la matrícula obtenida
        setErrorMessage(""); // Limpiar el mensaje de error
      } else {
        setMatricula(null); // Vaciar los datos si no se encuentra matrícula
        setErrorMessage("No se encontró la matrícula para el usuario y período especificados.");
      }
    } catch (error) {
      console.error("Error al consultar la matrícula:", error);
      setMatricula(null); // Vaciar los datos en caso de error
      setErrorMessage("No se pudo consultar la matrícula. Inténtalo más tarde.");
    }
  };

  return (
    <div className="consultar-matricula-container">
      <h2>Consultar Matrícula</h2>
      <div className="consultar-form">
        <div className="form-group">
          <label htmlFor="userId">ID del Usuario:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="period">Período Académico:</label>
          <input
            type="text"
            id="period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />
        </div>
        <button className="consultar-button" onClick={handleConsultar}>
          Consultar
        </button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {matricula && (
        <div className="result-container">
          <h3>Resultados de Matrícula</h3>
          <div className="courses-list">
            {Array.isArray(matricula.courses) && matricula.courses.length > 0 ? (
              matricula.courses.map((course, index) => (
                <div key={index} className="course-card">
                  <h4>Curso ID: {course.CourseID}</h4>
                  <p>Profesor ID: {course.ProfessorID}</p>
                </div>
              ))
            ) : (
              <p>No se encontraron cursos matriculados.</p>
            )}
          </div>
          <p className="total-credits">Total de Créditos: {matricula.total_credits || 0}</p>
        </div>
      )}

      {/* Botón para volver al apartado principal de Matrícula */}
      <button
        className="back-to-matricula-button"
        onClick={() => navigate("/home/matricula")}
      >
        Volver a Matrícula
      </button>
    </div>
  );
};

export default ConsultarMatricula;
