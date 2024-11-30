import React, { useState } from "react";
import "../styles/Notes.css";
import BackToHomeButton from "./BacktoHomeButton"; // Importamos el botón de regreso

const Notes = () => {
  // Datos de ejemplo para los ciclos y notas
  const academicCycles = [
    {
      cycle: "2024-1",
      courses: [
        { name: "Cálculo 1", grade: 18 },
        { name: "Matemáticas Discretas 1", grade: 15 },
        { name: "Comunicación", grade: 13 },
      ],
    },
    {
      cycle: "2024-2",
      courses: [
        { name: "Cálculo 2", grade: 16 },
        { name: "Física General", grade: 14 },
        { name: "Química General", grade: 12 },
      ],
    },
    {
      cycle: "2025-1",
      courses: [
        { name: "Álgebra Lineal", grade: 19 },
        { name: "Programación 1", grade: 17 },
        { name: "Estadística", grade: 11 },
      ],
    },
  ];

  const [selectedCycle, setSelectedCycle] = useState(academicCycles[0].cycle);

  // Obtiene los cursos del ciclo seleccionado
  const selectedCourses = academicCycles.find(
    (cycle) => cycle.cycle === selectedCycle
  )?.courses;

  return (
    <div className="notes-container">
      <h2>Notas Académicas</h2>

      {/* Selector para elegir el ciclo académico */}
      <div className="cycle-selector">
        <label htmlFor="cycle">Selecciona un ciclo académico:</label>
        <select
          id="cycle"
          value={selectedCycle}
          onChange={(e) => setSelectedCycle(e.target.value)}
        >
          {academicCycles.map((cycle, index) => (
            <option key={index} value={cycle.cycle}>
              {cycle.cycle}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de notas del ciclo seleccionado */}
      <div className="notes-list">
        {selectedCourses && selectedCourses.length > 0 ? (
          selectedCourses.map((course, index) => (
            <div className="note-card" key={index}>
              <h3>{course.name}</h3>
              <p>Nota: {course.grade}</p>
              <p
                className={
                  course.grade >= 11 ? "status-approved" : "status-failed"
                }
              >
                Estado: {course.grade >= 11 ? "Aprobado" : "Desaprobado"}
              </p>
            </div>
          ))
        ) : (
          <p>No hay datos disponibles para este ciclo.</p>
        )}
      </div>

      {/* Botón para regresar a la página de inicio */}
      <BackToHomeButton />
    </div>
  );
};

export default Notes;
