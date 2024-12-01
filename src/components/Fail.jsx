import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // Contexto para obtener el token
import BackToHomeButton from "./BacktoHomeButton";
import "../styles/Fail.css"; // Estilos personalizados

const Fail = () => {
  const [reprobados, setReprobados] = useState([]); // Estado para almacenar los cursos reprobados
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar errores
  const { authData } = useContext(AuthContext); // Obtener el token desde el contexto

  useEffect(() => {
    const fetchReprobados = async () => {
      try {
        const response = await axios.get(
          "https://ztxrx0s62d.execute-api.us-east-1.amazonaws.com/prod/notas/reprobados",
          {
            headers: {
              Authorization: authData.token, // Enviar el token en el header
            },
          }
        );

        if (response.data.statusCode === 200 && response.data.body.reprobados.length > 0) {
          setReprobados(response.data.body.reprobados); // Guardar cursos reprobados
          setErrorMessage(""); // Limpiar errores
        } else {
          setReprobados([]);
          setErrorMessage("¡Felicitaciones! No tienes cursos en riesgo.");
        }
      } catch (error) {
        console.error("Error al obtener los cursos reprobados:", error);
        setErrorMessage("No se pudieron obtener los cursos reprobados. Inténtalo más tarde.");
      }
    };

    fetchReprobados();
  }, [authData.token]);

  return (
    <div className="fail-container">
      <h2 className="fail-title">🚫 Cursos Reprobados</h2>
      {errorMessage ? (
        <p className="fail-description">{errorMessage}</p>
      ) : (
        <div className="reprobados-list">
          {reprobados.map((curso) => (
            <div key={curso.curso_id} className="reprobado-card">
              <h3>Curso ID: {curso.curso_id}</h3>
              <p>Período: {curso.periodo}</p>
              <p>Nota: {curso.grade}</p>
            </div>
          ))}
        </div>
      )}
      <div className="fail-buttons">
        <button className="fail-button" onClick={() => window.history.back()}>
          Regresar
        </button>
      </div>
    </div>
  );
};

export default Fail;
