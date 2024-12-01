import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ConsultarMatricula.css"; // Reutilizando estilos similares
import { AuthContext } from "../context/AuthContext";

const Matricularse = () => {
  const { authData } = useContext(AuthContext); // Obtener el token y facultad desde AuthContext
  const [userId, setUserId] = useState("");
  const [period, setPeriod] = useState("");
  const [courses, setCourses] = useState([]); // Lista de cursos para matrícula
  const [courseId, setCourseId] = useState("");
  const [professorId, setProfessorId] = useState("");
  const [totalCredits, setTotalCredits] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook para redirigir al usuario

  const handleAddCourse = () => {
    if (!courseId || !professorId) {
      setErrorMessage("Por favor, completa los campos de curso y profesor.");
      return;
    }

    const newCourse = {
      CourseID: courseId,
      ProfessorID: professorId,
    };

    setCourses([...courses, newCourse]);
    setCourseId("");
    setProfessorId("");
    setErrorMessage(""); // Limpiar mensaje de error
  };

  const handleRegistrar = async () => {
    if (!userId || !period || !totalCredits || courses.length === 0) {
      setErrorMessage("Por favor, completa todos los campos y agrega al menos un curso.");
      return;
    }

    try {
      const response = await axios.post(
        "https://8h7cdypcz0.execute-api.us-east-1.amazonaws.com/prod/matricula/registrar",
        {
          tenant_id: authData.facultad, // Usar la variable global facultad como tenant_id
          user_id: userId,
          period,
          courses,
          total_credits: parseInt(totalCredits), // Convertir a número
        },
        {
          headers: {
            Authorization: authData.token, // Agregar el token en el header
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Matrícula registrada exitosamente.");
        setErrorMessage("");
        // Limpiar campos del formulario
        setUserId("");
        setPeriod("");
        setCourses([]);
        setTotalCredits("");
      }
    } catch (error) {
      console.error("Error al registrar la matrícula:", error);
      setErrorMessage("No se pudo registrar la matrícula. Inténtalo más tarde.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="consultar-matricula-container">
      <h2>Registrar Matrícula</h2>
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
        <div className="form-group">
          <h3>Agregar Cursos</h3>
          <label htmlFor="courseId">ID del Curso:</label>
          <input
            type="text"
            id="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          />
          <label htmlFor="professorId">ID del Profesor:</label>
          <input
            type="text"
            id="professorId"
            value={professorId}
            onChange={(e) => setProfessorId(e.target.value)}
          />
          <button className="consultar-button" onClick={handleAddCourse}>
            Agregar Curso
          </button>
          <div className="courses-list">
            {courses.map((course, index) => (
              <div key={index} className="course-card">
                <p>Curso ID: {course.CourseID}</p>
                <p>Profesor ID: {course.ProfessorID}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="totalCredits">Total de Créditos:</label>
          <input
            type="number"
            id="totalCredits"
            value={totalCredits}
            onChange={(e) => setTotalCredits(e.target.value)}
          />
        </div>
        <button className="consultar-button" onClick={handleRegistrar}>
          Registrar
        </button>
      </div>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button
        className="back-to-matricula-button"
        onClick={() => navigate("/home/matricula")}
      >
        Volver a Matrícula
      </button>
    </div>
  );
};

export default Matricularse;
