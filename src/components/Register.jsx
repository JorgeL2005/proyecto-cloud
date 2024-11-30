import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Register = () => {
  const navigate = useNavigate();

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    tenant_id: "global",
    user_id: "",
    password: "",
    role: "student",
    specialty: "",
    email: "",
    gender: "female",
    fecha_nacimiento: "",
    first_name: "",
    last_name: "",
  });

  // Estado para manejar errores
  const [errorMessage, setErrorMessage] = useState("");

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Maneja el envío del formulario
  const handleRegister = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    try {
      const response = await fetch(
        "https://griqfpf552.execute-api.us-east-1.amazonaws.com/prod/usuarios/crear",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 200) {
        // Redirige al formulario de login si se registra con éxito
        console.log(":D")
        navigate("/login");
      } else {
        // Maneja errores si el registro falla
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al crear el usuario.");
      }
    } catch (error) {
      setErrorMessage("Error de conexión. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <div className="form-scroll-container">
          <form onSubmit={handleRegister}>
            <label htmlFor="tenant_id">Tenant ID:</label>
            <select
              id="tenant_id"
              name="tenant_id"
              value={formData.tenant_id}
              onChange={handleChange}
              required
            >
              <option value="global">Global</option>
              <option value="FC">FC</option>
              <option value="FI">FI</option>
              <option value="FN">FN</option>
            </select>
            <input
              type="text"
              name="user_id"
              placeholder="User ID"
              value={formData.user_id}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Administrator</option>
            </select>
            <input
              type="text"
              name="specialty"
              placeholder="Specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            <input
              type="date"
              name="fecha_nacimiento"
              placeholder="Fecha de Nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
