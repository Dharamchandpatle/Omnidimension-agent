import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CalendarIntegration() {
  const [cmd, setCmd] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Placeholder: fetch upcoming events from backend (which would talk to Google Calendar)
  useEffect(() => {
    setLoading(true);
    setErr("");
    axios.get(`${process.env.REACT_APP_GOOGLE_CALENDAR_API_URL}/events`)
      .then(res => setEvents(res.data.events || []))
      .catch(() => setErr("Failed to load events"))
      .finally(() => setLoading(false));
  }, []);

  // Handle natural language commands to set events
  const handleCommand = async e => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      await axios.post(`${process.env.REACT_APP_GOOGLE_CALENDAR_API_URL}/add`, { command: cmd });
      setCmd("");
      // Refresh events
      const res = await axios.get(`${process.env.REACT_APP_GOOGLE_CALENDAR_API_URL}/events`);
      setEvents(res.data.events || []);
    } catch {
      setErr("Failed to add event");
    }
    setLoading(false);
  };

  const handleSnooze = async id => {
    setLoading(true);
    setErr("");
    try {
      await axios.post(`${process.env.REACT_APP_GOOGLE_CALENDAR_API_URL}/snooze`, { id });
      // Refresh events
      const res = await axios.get(`${process.env.REACT_APP_GOOGLE_CALENDAR_API_URL}/events`);
      setEvents(res.data.events || []);
    } catch {
      setErr("Failed to snooze event");
    }
    setLoading(false);
  };

  return (
    <div>
      <h4>Calendar & Reminders</h4>
      <form onSubmit={handleCommand}>
        <input
          type="text"
          value={cmd}
          placeholder='e.g. "Set meeting Monday at 10am"'
          onChange={e => setCmd(e.target.value)}
        />
        <button type="submit" disabled={loading}>Add</button>
      </form>
      {err && <div className="alert">{err}</div>}
      <ul>
        {events.map(ev => (
          <li key={ev.id}>
            <b>{ev.title}</b>: {ev.time}
            <button onClick={() => handleSnooze(ev.id)} style={{ marginLeft: 10 }}>Snooze</button>
          </li>
        ))}
      </ul>
      {loading && <div className="spinner" />}
    </div>
  );
}