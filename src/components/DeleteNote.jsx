import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { data, useNavigate } from "react-router-dom";

const DeleteNote = () => {
  const { authData } = useContext(AuthContext); // Obtener el token desde el contexto global
  const [tenantId, setTenantId] = useState("");
  const [userId, setUserId] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [cursoId, setCursoId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();

    // Validar campos
    if (!tenantId || !userId || !periodo || !cursoId) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Realizar la solicitud DELETE al endpoint
      const response = await axios.delete(
        "https://ztxrx0s62d.execute-api.us-east-1.amazonaws.com/prod/notas/eliminar",
        {
          data: {
            tenant_id: tenantId,
            user_id: userId,
            periodo,
            curso_id: cursoId,
          },
          headers: {
            Authorization: authData.token, // Agregar el token en el header
          },
        }
      );
      console.log(response.data)
      if (response.status === 200) {
        setSuccessMessage("Nota eliminada exitosamente.");
        setErrorMessage("");
        // Limpiar los campos del formulario
        setUserId("");
        setPeriodo("");
        setCursoId("");
      }
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
      setErrorMessage("No se pudo eliminar la nota. Inténtalo más tarde.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="delete-note-container">
      <h2>Eliminar Nota</h2>
      <form onSubmit={handleDelete}>
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
          <label htmlFor="cursoId">ID del Curso:</label>
          <input
            type="text"
            id="cursoId"
            value={cursoId}
            onChange={(e) => setCursoId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Eliminar Nota</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={() => navigate("/home/notes")}>Volver a Notas</button>
    </div>
  );
};

export default DeleteNote;
