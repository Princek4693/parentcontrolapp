import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Parent-Child App
        </h2>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => {
              setMode("signin");
              resetMessages();
            }}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              mode === "signin"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Sign In
          </button>

          <button
            onClick={() => {
              setMode("signup");
              resetMessages();
            }}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              mode === "signup"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Sign Up
          </button>
        </div>

        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {mode === "signup" ? (
          <form onSubmit={handleSignup} className="space-y-4 mt-4">
            <div>
              
              <input
                value={fullName}
                placeholder='Enter Your Full Name'
                onChange={(e) => setfullName(e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
            
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="parent">Parent</option>
                <option value="child">Child</option>
              </select>
            </div>

            <div>
             
              <input
                type="email"
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              
              <input
                type="password"
                placeholder='Enter Your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
             
              <input
                type="password"
                placeholder='Enter Confirm Password'
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
            >
              Create Account
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignin} className="space-y-4 mt-4">
            <div>
          
              <input
                type="email"
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
             
              <input
                type="password"
                placeholder='Enter Your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="text-right">
              <Link
                to="/reset-password"
                className="text-indigo-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
            >
              Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}


export default Login;