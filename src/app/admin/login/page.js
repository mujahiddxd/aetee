"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import '../admin.css';

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Hardcoded logic for now as per spec
    if (username === "admin" && password === "aetee@2026") {
      // Typically we'd set an HTTP only cookie here, 
      // but for client-side quick start we just redirect to dashboard
      // Note: A real app will use a secure API route.
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="card login-card">
        <h2>Aetee Admin Portal</h2>
        
        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              className="input" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              className="input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
