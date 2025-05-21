import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/create"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="create-test-container">
      <h2>Créer un compte</h2>
      <form onSubmit={handleRegister} className="create-test-form">
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">S'inscrire</button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        Déjà un compte ? <Link to="/login">Connecte-toi ici</Link>
      </p>
    </div>
  );
}

export default Register;