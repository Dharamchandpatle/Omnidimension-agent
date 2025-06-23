import React, { useState, useRef } from 'react';
import omniDimension from '../api/omniDimension';
import useEmotion from '../hooks/useEmotion';

export default function VoiceAgent() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [emotion, setEmotion] = useState("neutral");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);

  // SpeechRecognition API setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const synth = window.speechSynthesis;

  const analyzeTranscript = async (text) => {
    // Custom emotion detection
    const emo = useEmotion(text);
    setEmotion(emo);
    return emo;
  };

  const startListening = () => {
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    setTranscript("");
    setListening(true);
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = async event => {
      const txt = event.results[0][0].transcript;
      setTranscript(txt);
      setListening(false);
      const emo = await analyzeTranscript(txt);
      await sendToAgent(txt, emo);
    };
    recognition.onerror = e => {
      setListening(false);
      alert(e.error || "Speech recognition error");
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current && recognitionRef.current.stop();
    setListening(false);
  };

  const sendToAgent = async (text, emo) => {
    setLoading(true);
    setResponse("");
    try {
      const res = await omniDimension.sendMessage(text, emo);
      setResponse(res.reply);
      speakResponse(res.reply, emo);
    } catch {
      setResponse("Sorry, there was an error communicating with the agent.");
    }
    setLoading(false);
  };

  const speakResponse = (text, emo) => {
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);
    // Modulate pitch/rate based on emotion (basic example)
    if (emo === 'happy') {
      utter.pitch = 1.5;
      utter.rate = 1.2;
    } else if (emo === 'sad') {
      utter.pitch = 0.7;
      utter.rate = 0.9;
    }
    synth.speak(utter);
  };

  return (
    <div>
      <h4>Voice Agent</h4>
      <button onClick={listening ? stopListening : startListening} disabled={loading}>
        {listening ? 'Stop' : 'Speak'}
      </button>
      <div>
        <b>Your input:</b> {transcript}
        <br />
        <b>Emotion:</b> {emotion}
      </div>
      {loading ? <div className="spinner" /> : response && (
        <div className="agent-response">
          <b>Agent:</b> {response}
        </div>
      )}
    </div>
  );
}