import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import CreateTest from './pages/CreateTest';
import PlayTest from './pages/PlayTest';
import Header from './components/Header';
import Login from "./pages/Login";
import Register from "./pages/Register";

function PrivateRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  if (user === undefined) return null; // ou un loader
  return user ? children : <Login />;
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<h2>Bienvenue sur GuessTheBeat 🎵</h2>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateTest />
            </PrivateRoute>
          }
        />
        <Route path="/play/:id" element={<PlayTest />} />
      </Routes>
    </Router>
  );
}

export default App;
