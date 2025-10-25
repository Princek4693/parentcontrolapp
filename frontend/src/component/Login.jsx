import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [mode, setMode] = useState('signin');
  const [role, setRole] = useState('parent');
  const [fullName, setfullName] = useState("")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const validateEmail = (e) => /\S+@\S+\.\S+/.test(e);

  const resetMessages = () => {
    setMessage('');
    setError('');
  };

  
  const handleSignup = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!validateEmail(email)) return setError('Invalid email');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (password !== confirm) return setError("Passwords don't match");

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({fullName, email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Registered successfully');
        setMode('signin');
        setEmail('');
        setfullName("")
        setPassword('');
        setConfirm('');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  // 📌 SIGN IN
  const handleSignin = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!validateEmail(email)) return setError('Invalid email');
    if (!password) return setError('Password is required');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
  localStorage.setItem('authToken', data.token);
  localStorage.setItem('authRole', data.role);

  setMessage('Login successful');

  if (data.role === "parent") {
    navigate("/dashboard");
  } else if (data.role === "child") {
    navigate("/childdashboard");
  } else {
    setError('Invalid user role');
  }

} else {
  setError(data.message || 'Login failed');
}

    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>Parent-Child App</h2>
      <button onClick={() => { setMode('signin'); resetMessages(); }}>Sign In</button>
      <button onClick={() => { setMode('signup'); resetMessages(); }}>Sign Up</button>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {mode === 'signup' ? (
        <form onSubmit={handleSignup}>
             <div>
            <label>fullName: </label>
            <input value={fullName} onChange={(e) => setfullName(e.target.value)} />
          </div>
          <div>
            <label>Role: </label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="parent">Parent</option>
              <option value="child">Child</option>
            </select>
          </div>
          <div>
            <label>Email: </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label>Confirm Password: </label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>
          <button type="submit">Create Account</button>
        </form>
      ) : (
        <form onSubmit={handleSignin}>
          <div>
            <label>Email: </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Sign In</button>
        </form>
      )}
    </div>
  );
}


export default Login;