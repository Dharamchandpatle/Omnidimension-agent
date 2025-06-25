import React, { useState } from 'react';
import { useAgent, DispatchResponse, CallLog } from '../context/AgentContext';
import { Phone, Calendar } from 'lucide-react';

export const ServiceIntegrations: React.FC = () => {
  const { agents, dispatchCall, getCallLogs } = useAgent();

  const [agentId, setAgentId] = useState<number>(0);
  const [phone, setPhone] = useState<string>('');
  const [ctx, setCtx] = useState<Record<string, any>>({});
  const [history, setHistory] = useState<CallLog[]>([]);

  const doDispatch = async () => {
    try {
      if (!agentId) throw new Error('Agent ID चाहिए');
      const resp: DispatchResponse = await dispatchCall(agentId, phone, ctx);
      alert(`Call dispatched! ID: ${resp.call_id}`);
    } catch (err: any) {
      console.error(err);
      alert('Dispatch failed: ' + err.message);
    }
  };

  const loadLogs = async () => {
    try {
      if (!agentId) throw new Error('Agent ID चाहिए');
      const logs = await getCallLogs(1, 20, agentId);
      setHistory(logs);
    } catch (err: any) {
      console.error(err);
      alert('Failed to load logs: ' + err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border shadow-xl">
        <h2 className="text-3xl font-bold mb-6">
          OmniDimension Call Integration
        </h2>

        {/* एजेंट ड्रॉपडाउन */}
        <select
          className="border p-2 rounded w-full mb-4"
          value={agentId}
          onChange={e => setAgentId(Number(e.target.value))}
        >
          <option value={0}>— Select Agent —</option>
          {agents.map(a => (
            <option key={a.id} value={a.id}>
              {a.name} ({a.id})
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Phone # (+91...)"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        <textarea
          placeholder="Call Context JSON"
          onChange={e => {
            try {
              setCtx(JSON.parse(e.target.value));
            } catch {
              setCtx({});
            }
          }}
          className="border p-2 rounded w-full h-24 mb-4"
        />

        <div className="flex space-x-2 mb-4">
          <button
            onClick={doDispatch}
            className="flex-1 px-4 py-2 rounded bg-blue-600 text-white flex items-center justify-center"
          >
            <Phone className="mr-2" /> Dispatch Call
          </button>
          <button
            onClick={loadLogs}
            className="flex-1 px-4 py-2 rounded bg-green-600 text-white flex items-center justify-center"
          >
            <Calendar className="mr-2" /> Load Call Logs
          </button>
        </div>

        <ul className="space-y-2">
          {history.map(h => (
            <li
              key={h.call_id}
              className="flex justify-between p-2 border rounded"
            >
              <span className="font-mono">{h.call_id}</span>
              <span>{h.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
