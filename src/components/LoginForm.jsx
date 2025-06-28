import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.email === "admin@oneoff.com") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("Identifiants incorrects.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow-lg rounded-xl border">
      <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          className="w-full border px-4 py-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border px-4 py-2 rounded"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
