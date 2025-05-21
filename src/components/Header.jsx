import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState, useEffect } from "react";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Vous êtes déconnecté !");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <nav style={{ padding: '1rem', background: '#222', color: 'white' }}>
      <h1>GuessTheBeat</h1>
      <Link to="/" style={{ marginRight: 10, color: 'white' }}>Accueil</Link>
      {user && (
        <>
          <Link to="/create" style={{ marginRight: 10, color: 'white' }}>Créer un blind test</Link>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Déconnexion
          </button>
        </>
      )}
      {!user && (
        <>
          <Link to="/login" style={{ marginLeft: 10, color: 'white' }}>Connexion</Link>
          <Link to="/register" style={{ marginLeft: 10, color: 'white' }}>Inscription</Link>
        </>
      )}
    </nav>
  );
}

export default Header;
