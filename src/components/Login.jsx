import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { AuthContext } from "../context/AuthContext"; // Importar el contexto

const Login = () => {
  const navigate = useNavigate();
  const { setAuthData } = useContext(AuthContext); // Obtener función para actualizar el contexto

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    tenant_id: "FC",
    user_id: "",
    password: "",
    role: "student",
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
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://griqfpf552.execute-api.us-east-1.amazonaws.com/prod/usuarios/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      // Validar la respuesta devuelta por el backend
      if (data.body && data.body.message === "Login exitoso") {
        // Extraer token, rol y facultad (tenant_id) del formulario
        const { token, role } = data.body;
        const { tenant_id } = formData;

        // Guardar el token, rol y facultad en el contexto global
        setAuthData({
          token: token,
          role: role,
          facultad: tenant_id, // Guardar el tenant_id como facultad
        });

        // Redirigir al Home
        console.log(token)
        console.log(tenant_id)
        navigate("/home");
      } else {
        // Si el mensaje no es "Login exitoso", asumimos error
        setErrorMessage(data.body.message || "Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.log(error)
      setErrorMessage("Error de conexión. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="tenant_id">Tenant ID:</label>
          <select
            id="tenant_id"
            name="tenant_id"
            value={formData.tenant_id}
            onChange={handleChange}
            required
          >
            <option value="FC">FC</option>
            <option value="FI">FI</option>
            <option value="FN">FN</option>
            <option value="global">Global</option>
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
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
