import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/create");
    } catch (err) {
      setError("Identifiants invalides");
    }
  };

  return (
    <div className="create-test-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="create-test-form">
        <div>
          <label>Email :</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;