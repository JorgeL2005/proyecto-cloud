import React, { useState, useContext } from "react";
import axios from "axios";
import "../styles/CrearCarrera.css"; // Archivo CSS para diseño
import BackToHomeButton from "./BacktoHomeButton";
import { AuthContext } from "../context/AuthContext";

const CrearCarrera = () => {
  const [tenantId, setTenantId] = useState(""); // Tenant ID ingresado por el usuario
  const [programId, setProgramId] = useState("");
  const [programName, setProgramName] = useState("");
  const [creditsRequired, setCreditsRequired] = useState("");
  const [coursesByLevel, setCoursesByLevel] = useState({});
  const [currentLevel, setCurrentLevel] = useState("");
  const [currentCourses, setCurrentCourses] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { authData } = useContext(AuthContext);

  const handleAddLevel = () => {
    if (!currentLevel || !currentCourses) {
      setErrorMessage("Por favor completa el nivel y los cursos antes de agregar.");
      return;
    }

    const coursesArray = currentCourses.split(",").map((course) => course.trim());
    setCoursesByLevel({
      ...coursesByLevel,
      [currentLevel]: coursesArray,
    });

    setCurrentLevel("");
    setCurrentCourses("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tenantId || !programId || !programName || !creditsRequired || Object.keys(coursesByLevel).length === 0) {
      setErrorMessage("Por favor completa todos los campos del formulario.");
      return;
    }

    try {
      const response = await axios.post(
        "https://jni3djrkie.execute-api.us-east-1.amazonaws.com/prod/program/crear",
        {
          tenant_id: tenantId,
          program_id: programId,
          program_name: programName,
          credits_required: parseInt(creditsRequired),
          courses_by_level: coursesByLevel,
        },
        {
          headers: {
            Authorization: authData.token, // Reemplaza con tu lógica para obtener el token si es necesario
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Carrera creada exitosamente.");
        setErrorMessage("");
        // Limpiar formulario
        setTenantId("");
        setProgramId("");
        setProgramName("");
        setCreditsRequired("");
        setCoursesByLevel({});
      }
    } catch (error) {
      console.error("Error al crear la carrera:", error);
      setSuccessMessage("");
      setErrorMessage("No se pudo crear la carrera. Inténtalo más tarde.");
    }
  };

  return (
    <div className="crear-carrera-container">
      <h2>Crear Carrera</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tenantId">ID del Tenant:</label>
          <input
            type="text"
            id="tenantId"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="programId">ID de la Carrera:</label>
          <input
            type="text"
            id="programId"
            value={programId}
            onChange={(e) => setProgramId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="programName">Nombre de la Carrera:</label>
          <input
            type="text"
            id="programName"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="creditsRequired">Créditos Requeridos:</label>
          <input
            type="number"
            id="creditsRequired"
            value={creditsRequired}
            onChange={(e) => setCreditsRequired(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentLevel">Nivel Académico:</label>
          <input
            type="text"
            id="currentLevel"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(e.target.value)}
            placeholder="Ejemplo: 1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentCourses">Cursos (separados por coma):</label>
          <input
            type="text"
            id="currentCourses"
            value={currentCourses}
            onChange={(e) => setCurrentCourses(e.target.value)}
            placeholder="Ejemplo: CC1101, CS1111"
          />
        </div>
        <button type="button" className="add-level-button" onClick={handleAddLevel}>
          Agregar Nivel
        </button>
        {Object.keys(coursesByLevel).length > 0 && (
          <div className="courses-by-level-preview">
            <h3>Niveles Agregados</h3>
            {Object.entries(coursesByLevel).map(([level, courses]) => (
              <div key={level}>
                <p>
                  <strong>Nivel {level}:</strong> {courses.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
        <button type="submit" className="crear-button">
          Crear Carrera
        </button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <BackToHomeButton />
    </div>
  );
};

export default CrearCarrera;
