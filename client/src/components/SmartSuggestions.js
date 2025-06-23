import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SmartSuggestions() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setLoading(true);
    setErr("");
    // Placeholder: Fetch personalized tips from backend
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/suggestions`)
      .then(res => setTips(res.data.tips || []))
      .catch(() => setErr("Failed to load suggestions"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" />;
  if (err) return <div className="alert">{err}</div>;

  return (
    <div>
      <h4>Smart Suggestions</h4>
      <ul>
        {tips.map((tip, i) => <li key={i}>{tip}</li>)}
      </ul>
    </div>
  );
}