import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../styles/AvanceAcademico.css"; // Archivo CSS para personalizar el diseño
import BackToHomeButton from "./BacktoHomeButton";
import { AuthContext } from "../context/AuthContext";

const AvanceAcademico = () => {
  const [academicProgress, setAcademicProgress] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { authData } = useContext(AuthContext); // Obtener tenant_id y user_id desde el contexto

  useEffect(() => {
    const fetchAcademicProgress = async () => {
      try {
        const response = await axios.get(
          "https://jeml2rz86d.execute-api.us-east-1.amazonaws.com/prod/avanceacademico/total",
          {
            headers: {
              Authorization: authData.token, // Token de autorización
            },
          }
        );

        if (response.data.body && response.data.body.academic_progress) {
          setAcademicProgress(response.data.body.academic_progress);
          setErrorMessage("");
        } else {
          setAcademicProgress({});
          setErrorMessage("Sin historial académico disponible.");
        }
      } catch (error) {
        console.error("Error al obtener el avance académico:", error);
        setAcademicProgress({});
        setErrorMessage("No se pudo cargar el avance académico. Inténtalo más tarde.");
      }
    };

    fetchAcademicProgress();
  }, [authData.token]);

  return (
    <div className="avance-academico-container">
      <h2>Avance Académico</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="levels-container">
        {Object.keys(academicProgress).map((level) => (
          <div className="academic-level" key={level}>
            <h3>Nivel {level}</h3>
            <div className="courses-container">
              {Array.isArray(academicProgress[level]) ? (
                academicProgress[level].map((course, index) => (
                  <div className="course-card" key={index}>
                    <h4>{course.course_name}</h4>
                    <p>
                      <strong>Curso ID:</strong> {course.course_id}
                    </p>
                    <p>
                      <strong>Créditos:</strong> {course.credits}
                    </p>
                    <p>
                      <strong>Nota:</strong> {course.grade}
                    </p>
                    <p>
                      <strong>Estado:</strong>{" "}
                      <span
                        className={
                          course.status === "approved"
                            ? "status-approved"
                            : course.status === "failed"
                            ? "status-failed"
                            : "status-pending"
                        }
                      >
                        {course.status}
                      </span>
                    </p>
                    <p>
                      <strong>Periodo:</strong> {course.period}
                    </p>
                  </div>
                ))
              ) : (
                <p className="no-courses-message">{academicProgress[level]}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <BackToHomeButton />
    </div>
  );
};

export default AvanceAcademico;
