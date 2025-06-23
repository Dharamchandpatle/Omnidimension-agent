import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import auth, { loginSuccess } from '../utils/authSlice';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const user = await auth.register(name, email, password);
      dispatch(loginSuccess(user));
      navigate("/dashboard");
    } catch (e) {
      setErr(e.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="centered-box">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input required placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br />
        <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
        <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      </form>
      {err && <div className="alert">{err}</div>}
      <div>
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
}