import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../styles/Perfil.css"; // Estilos personalizados para Perfil
import { AuthContext } from "../context/AuthContext";
import BackToHomeButton from "./BacktoHomeButton";

const Perfil = () => {
  const { authData } = useContext(AuthContext); // Datos del usuario desde el contexto global
  const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar errores

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://griqfpf552.execute-api.us-east-1.amazonaws.com/prod/usuarios/obtener",
          {
            headers: {
              Authorization: authData.token, // Enviar el token en el header
            },
          }
        );

        if (response.status === 200 && response.data.body) {
          setUserData(response.data.body); // Guardar los datos del usuario
          setErrorMessage("");
        } else {
          setErrorMessage("No se pudo obtener la información del usuario.");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        setErrorMessage("Hubo un problema al cargar los datos del perfil.");
      }
    };

    fetchUserData();
  }, [authData.token]);

  return (
    <div className="perfil-container">
      <h2>Perfil del Usuario</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {userData ? (
        <div className="perfil-details">
          <p><strong>Nombre:</strong> {userData.first_name} {userData.last_name}</p>
          <p><strong>Correo Electrónico:</strong> {userData.email}</p>
          <p><strong>ID del Usuario:</strong> {userData.userId}</p>
          <p><strong>Facultad:</strong> {userData.tenantId}</p>
          <p><strong>Especialidad:</strong> {userData.specialty}</p>
          <p><strong>Rol:</strong> {userData.role}</p>
          <p><strong>Estado:</strong> {userData.status}</p>
          <p><strong>Género:</strong> {userData.gender}</p>
          <p><strong>Fecha de Nacimiento:</strong> {userData.fecha_nacimiento}</p>
        </div>
      ) : (
        !errorMessage && <p>Cargando información del perfil...</p>
      )}
      <BackToHomeButton />
    </div>
  );
};

export default Perfil;
