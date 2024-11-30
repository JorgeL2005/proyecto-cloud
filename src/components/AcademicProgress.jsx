import React from "react";
import "../styles/AcademicProgress.css";
import BackToHomeButton from "./BacktoHomeButton";

const AcademicProgress = () => {
  // Datos de ejemplo organizados por niveles
  const levels = [
    {
      title: "Nivel 1",
      courses: [
        { name: "Cálculo 1", credits: 5, status: "Aprobado" },
        { name: "Matemáticas Discretas 1", credits: 4, status: "Pendiente" },
        { name: "Comunicación", credits: 3, status: "Desaprobado" },
      ],
    },
    {
      title: "Nivel 2",
      courses: [
        { name: "Cálculo 2", credits: 5, status: "Aprobado" },
        { name: "Física General", credits: 4, status: "Pendiente" },
        { name: "Química General", credits: 3, status: "Pendiente" },
      ],
    },
    {
      title: "Nivel 3",
      courses: [
        { name: "Álgebra Lineal", credits: 5, status: "Aprobado" },
        { name: "Física 2", credits: 4, status: "Pendiente" },
        { name: "Programación 1", credits: 4, status: "Aprobado" },
      ],
    },
    // Agrega más niveles hasta el nivel 10
  ];

  return (
    <div className="academic-progress-container">
      <h2>Avance Académico</h2>
      <div className="academic-progress-levels">
        {levels.map((level, index) => (
          <div className="academic-level" key={index}>
            <h3>{level.title}</h3>
            <div className="academic-courses">
              {level.courses.map((course, idx) => (
                <div className="academic-course-card" key={idx}>
                  <h4>{course.name}</h4>
                  <p>Créditos: {course.credits}</p>
                  <p>
                    Estado:{" "}
                    <span
                      className={
                        course.status === "Aprobado"
                          ? "status-approved"
                          : course.status === "Desaprobado"
                          ? "status-failed"
                          : "status-pending"
                      }
                    >
                      {course.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <BackToHomeButton />
    </div>
  );
};

export default AcademicProgress;
