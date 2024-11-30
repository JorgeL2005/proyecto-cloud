import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Importar el contexto global
import "../styles/Courses.css"; // Puedes agregar estilos personalizados aquí
import BackToHomeButton from "./BacktoHomeButton";

const Courses = () => {
  const { authData } = useContext(AuthContext); // Obtener token del contexto global
  const [courses, setCourses] = useState([]); // Estado para almacenar los cursos
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar errores

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        "https://dhj0o2100h.execute-api.us-east-1.amazonaws.com/prod/cursos/allcursos",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authData.token, // Pasar el token en los headers
          },
        }
      );

      // Manejo de respuesta
      if (response.ok) {
        const data = await response.json();
        if (data.body && data.body.cursos) {
          setCourses(data.body.cursos); // Guardar los cursos en el estado
          setErrorMessage(""); // Limpiar mensajes de error
        } else {
          setErrorMessage("No se encontraron cursos.");
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.body?.error || "Error al obtener los cursos.");
      }
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
      setErrorMessage("Error al conectar con el servidor.");
    }
  };

  useEffect(() => {
    fetchCourses(); // Llamar a la función cuando el componente se monte
  }, []);

  return (
    <div className="courses-container">
      <h2>Lista de Cursos</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="courses-list">
        {courses.map((course) => (
          <div className="course-card" key={course.curso_id}>
            <h3>{course.CourseName}</h3>
            <p><strong>Descripción:</strong> {course.Description}</p>
            <p><strong>Créditos:</strong> {course.Credits}</p>
          </div>
        ))}
      </div>
      <BackToHomeButton />
    </div>
  );
};

export default Courses;
