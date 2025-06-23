import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import auth, { loginSuccess } from '../utils/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const user = await auth.login(email, password, remember);
      dispatch(loginSuccess(user));
      navigate("/dashboard");
    } catch (e) {
      setErr(e.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="centered-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
        <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <label>
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
          Remember Me
        </label><br />
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      {err && <div className="alert">{err}</div>}
      <div>
        <Link to="/register">Don't have an account? Register</Link>
      </div>
    </div>
  );
}