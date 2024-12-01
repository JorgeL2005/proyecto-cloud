import React, { useState, useContext } from "react";
import axios from "axios";
import "../styles/CreateNote.css"; // Archivo para los estilos personalizados
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CrearNote = () => {
  const { authData } = useContext(AuthContext); // Obtener el token desde el contexto global
  const [tenantId, setTenantId] = useState("FC");
  const [userId, setUserId] = useState("");
  const [cursoId, setCursoId] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [grade, setGrade] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    if (!tenantId || !userId || !cursoId || !periodo || !grade) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Realizar la solicitud POST al endpoint
      const response = await axios.post(
        "https://ztxrx0s62d.execute-api.us-east-1.amazonaws.com/prod/notas/crear",
        {
          tenant_id: tenantId,
          user_id: userId,
          curso_id: cursoId,
          periodo,
          grade: parseInt(grade), // Convertir la nota a un número
        },
        {
          headers: {
            Authorization: authData.token, // Agregar el token en el header
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Nota creada exitosamente.");
        setErrorMessage("");
        // Limpiar los campos del formulario
        setUserId("");
        setCursoId("");
        setPeriodo("");
        setGrade("");
      }
    } catch (error) {
      console.error("Error al crear la nota:", error);
      setErrorMessage("No se pudo crear la nota. Inténtalo más tarde.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="create-note-container">
      <h2>Crear Nota</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tenantId">ID de Tenant:</label>
          <select
            id="tenantId"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
          >
            <option value="FC">FC</option>
            <option value="FI">FI</option>
            <option value="FN">FN</option>
            <option value="global">Global</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="userId">ID del Usuario:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cursoId">ID del Curso:</label>
          <input
            type="text"
            id="cursoId"
            value={cursoId}
            onChange={(e) => setCursoId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="periodo">Período Académico:</label>
          <input
            type="text"
            id="periodo"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="grade">Nota:</label>
          <input
            type="number"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Nota</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={() => navigate("/home/notes")}>Volver a Notas</button>
    </div>
  );
};

export default CrearNote;
