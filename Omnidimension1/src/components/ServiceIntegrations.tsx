import React, { useState } from 'react';
import { useAgent } from '../context/AgentContext';
import { Phone, Calendar, Search, CreditCard, MapPin, Mail, CheckCircle, AlertCircle } from 'lucide-react';

export const ServiceIntegrations: React.FC = () => {
  const { dispatchCall, getCallLogs } = useAgent();
  const [phone, setPhone] = useState('');
  const [agentId, setAgentId] = useState<number>(0);
  const [ctx, setCtx] = useState<Record<string, any>>({});
  const [history, setHistory] = useState<any[]>([]);

  const doDispatch = async () => {
    try {
      const resp = await dispatchCall(agentId, phone, ctx);
      alert(`Call dispatched! ID: ${resp.call_id}`);
    } catch (err) {
      console.error(err);
      alert('Dispatch failed');
    }
  };

  const loadLogs = async () => {
    try {
      const logs = await getCallLogs(1, 20, agentId);
      setHistory(logs);
    } catch (err) {
      console.error(err);
      alert('Failed to load logs');
    }
  };

  return (
    <div className="space-y-8">
      {/* Existing integrations UI */}
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          OmniDimension Call Integration
        </h2>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Agent ID"
            value={agentId}
            onChange={e => setAgentId(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Phone # (+91...)"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <textarea
            placeholder="Call Context JSON"
            onChange={e => { try { setCtx(JSON.parse(e.target.value)); } catch { setCtx({}); } }}
            className="border p-2 rounded w-full h-24"
          />
          <button onClick={doDispatch} className="px-4 py-2 rounded bg-blue-600 text-white">
            Dispatch Call
          </button>
          <button onClick={loadLogs} className="px-4 py-2 rounded bg-green-600 text-white ml-2">
            Load Call Logs
          </button>
        </div>
        <ul className="mt-4 space-y-1">
          {history.map(h => (
            <li key={h.call_id} className="flex justify-between">
              <span>{h.call_id}</span><span>{h.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
