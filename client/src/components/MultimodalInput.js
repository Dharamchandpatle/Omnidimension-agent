import React, { useRef, useState } from 'react';
import Tesseract from 'tesseract.js';
import omniDimension from '../api/omniDimension';

export default function MultimodalInput() {
  const fileInput = useRef();
  const [image, setImage] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [agentReply, setAgentReply] = useState("");

  const handleFile = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    setOcrText("");
    setImage(URL.createObjectURL(file));
    // OCR using Tesseract.js
    Tesseract.recognize(file, 'eng').then(({ data: { text } }) => {
      setOcrText(text);
      setLoading(false);
    });
  };

  const confirmAndSend = async () => {
    setConfirmed(true);
    setLoading(true);
    try {
      const res = await omniDimension.sendMessage(ocrText);
      setAgentReply(res.reply);
    } catch {
      setAgentReply("Error sending to agent.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h4>Multimodal Input (Image/OCR)</h4>
      <input type="file" accept="image/*" ref={fileInput} onChange={handleFile} />
      {loading && <div className="spinner" />}
      {image && <img src={image} alt="Preview" style={{ maxWidth: 180, maxHeight: 180 }} />}
      {ocrText && !confirmed && (
        <div>
          <b>Extracted text:</b>
          <pre>{ocrText}</pre>
          <button onClick={confirmAndSend}>Send to Agent</button>
        </div>
      )}
      {confirmed && agentReply && <div><b>Agent:</b> {agentReply}</div>}
    </div>
  );
}