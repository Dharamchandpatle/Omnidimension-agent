import React, { useState, useEffect } from 'react';
import { Activity, Pause, Play, Square, Download, Volume2 } from 'lucide-react';
import { useTask } from '../context/TaskContext';

interface LogEntry {
  id: string;
  timestamp: Date;
  agent: string;
  action: string;
  status: 'info' | 'success' | 'warning' | 'error';
  details: string;
}

export const ExecutionMonitor: React.FC = () => {
  const { activeTasks } = useTask();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [voiceUpdates, setVoiceUpdates] = useState(true);

  const speak = (text: string) => {
    if (!voiceUpdates || !('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.6;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Simulate real-time log updates
    const interval = setInterval(() => {
      if (isMonitoring && activeTasks.length > 0) {
        const agents = ['Research Agent', 'Call Agent', 'Schedule Agent', 'Coordinator'];
        const actions = ['Searching providers', 'Making call', 'Booking appointment', 'Updating calendar'];
        const statuses: Array<'info' | 'success' | 'warning' | 'error'> = ['info', 'success', 'warning'];
        
        const agent = agents[Math.floor(Math.random() * agents.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        const newLog: LogEntry = {
          id: Date.now().toString(),
          timestamp: new Date(),
          agent,
          action,
          status,
          details: 'Processing task step with external service integration...'
        };

        setLogs(prev => [newLog, ...prev.slice(0, 49)]);

        // Provide voice updates for important events
        if (voiceUpdates && (status === 'success' || Math.random() > 0.7)) {
          const message = `${agent} ${action.toLowerCase()} - ${status}`;
          speak(message);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isMonitoring, activeTasks, voiceUpdates]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100 border-green-200';
      case 'warning': return 'text-amber-600 bg-amber-100 border-amber-200';
      case 'error': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-blue-600 bg-blue-100 border-blue-200';
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold flex items-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl mr-4 shadow-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          Real-time Execution Monitor
        </h2>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setVoiceUpdates(!voiceUpdates)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 shadow-lg transform hover:scale-105 ${
              voiceUpdates ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white' : 'bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white'
            }`}
            title={voiceUpdates ? 'Disable voice updates' : 'Enable voice updates'}
          >
            <Volume2 className="w-4 h-4" />
            <span className="font-medium">Voice</span>
          </button>
          
          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 shadow-lg transform hover:scale-105 ${
              isMonitoring ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
            }`}
          >
            {isMonitoring ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="font-medium">{isMonitoring ? 'Pause' : 'Resume'}</span>
          </button>
          
          <button
            onClick={() => setLogs([])}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl transition-all duration-200 shadow-lg transform hover:scale-105"
          >
            <Square className="w-4 h-4" />
            <span className="font-medium">Clear</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-lg transform hover:scale-105">
            <Download className="w-4 h-4" />
            <span className="font-medium">Export</span>
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 h-96 overflow-y-auto font-mono text-sm shadow-inner">
        {logs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p className="text-center">No execution logs yet. Submit a task to see real-time updates with voice feedback.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start space-x-4 p-3 hover:bg-gray-800/50 rounded-lg transition-all duration-200">
                <span className="text-gray-500 text-xs mt-1 w-20 flex-shrink-0">
                  {log.timestamp.toLocaleTimeString()}
                </span>
                
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(log.status)}`}>
                  {log.status.toUpperCase()}
                </span>
                
                <span className="text-purple-400 font-bold min-w-0 flex-shrink-0">
                  [{log.agent}]
                </span>
                
                <div className="flex-1 min-w-0">
                  <span className="text-white font-medium">{log.action}</span>
                  <span className="text-gray-400 block text-xs mt-1">{log.details}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};