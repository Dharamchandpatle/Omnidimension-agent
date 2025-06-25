import React, { useEffect, useState } from 'react';
import { useAgent } from '../context/AgentContext';
import { Activity, Pause, Play, Square, Download, Volume2 } from 'lucide-react';

export const ExecutionMonitor: React.FC = () => {
  const [callLogs, setCallLogs] = useState<any[]>([]);
  const { getCallLogs } = useAgent();
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [voiceUpdates, setVoiceUpdates] = useState(true);

  useEffect(() => {
    // Fetch recent call logs once
    (async () => {
      try {
        const logs = await getCallLogs(1, 10);
        setCallLogs(logs);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [getCallLogs]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100 border-green-200';
      case 'warning': return 'text-amber-600 bg-amber-100 border-amber-200';
      case 'error':   return 'text-red-600 bg-red-100 border-red-200';
      default:        return 'text-blue-600 bg-blue-100 border-blue-200';
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold flex items-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          <Activity className="w-6 h-6 text-white mr-2 bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl shadow-lg" />
          Real-time Execution Monitor
        </h2>
        {/* controles omitted for brevity */}
      </div>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 h-96 overflow-y-auto font-mono text-sm shadow-inner">
        {callLogs.length === 0 ? (
          <p className="text-gray-400 text-center">No calls yet.</p>
        ) : (
          callLogs.map(log => (
            <div key={log.call_id} className="flex justify-between py-1">
              <span>{log.call_id}</span>
              <span className={`px-2 py-0.5 rounded-full border ${getStatusColor(log.status)}`}>{log.status.toUpperCase()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
