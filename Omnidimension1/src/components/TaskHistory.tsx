import React, { useState } from 'react';
import { History, Clock, CheckCircle, XCircle, MoreVertical, Search } from 'lucide-react';

interface HistoryTask {
  id: string;
  description: string;
  status: 'completed' | 'failed' | 'cancelled';
  createdAt: Date;
  completedAt?: Date;
  duration?: number;
  agentsUsed: string[];
  servicesUsed: string[];
  result?: string;
}

export const TaskHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const historyTasks: HistoryTask[] = [
    {
      id: '1',
      description: 'Find the best dentist in NYC, call to book an appointment this week',
      status: 'completed',
      createdAt: new Date(Date.now() - 86400000),
      completedAt: new Date(Date.now() - 83400000),
      duration: 3600,
      agentsUsed: ['Research Agent', 'Call Agent', 'Schedule Agent'],
      servicesUsed: ['Google Search', 'OmniDimension', 'Google Calendar'],
      result: 'Successfully booked appointment with Dr. Smith for Thursday 2PM'
    },
    {
      id: '2',
      description: 'Research restaurants for anniversary dinner, make reservation for 2',
      status: 'completed',
      createdAt: new Date(Date.now() - 172800000),
      completedAt: new Date(Date.now() - 170400000),
      duration: 2400,
      agentsUsed: ['Research Agent', 'Call Agent'],
      servicesUsed: ['Google Search', 'OmniDimension'],
      result: 'Reserved table at Le Bernardin for Saturday 7PM'
    },
    {
      id: '3',
      description: 'Find a plumber, get quotes for bathroom renovation',
      status: 'failed',
      createdAt: new Date(Date.now() - 259200000),
      agentsUsed: ['Research Agent', 'Call Agent'],
      servicesUsed: ['Google Search'],
      result: 'Failed to reach contractors - phone service unavailable'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 border-green-200';
      case 'failed': return 'text-red-600 bg-red-100 border-red-200';
      case 'cancelled': return 'text-gray-600 bg-gray-100 border-gray-200';
      default: return 'text-blue-600 bg-blue-100 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const filteredTasks = historyTasks.filter(task => {
    const matchesSearch = task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl mr-4 shadow-lg">
              <History className="w-6 h-6 text-white" />
            </div>
            Task History
          </h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/80 border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white/80 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white/80 rounded-xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-gray-900 font-semibold mb-3 text-lg">{task.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <span>Created: {task.createdAt.toLocaleString()}</span>
                    {task.completedAt && (
                      <span>Completed: {task.completedAt.toLocaleString()}</span>
                    )}
                    {task.duration && (
                      <span>Duration: {formatDuration(task.duration)}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`px-4 py-2 rounded-full text-xs font-bold border ${getStatusColor(task.status)}`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </div>
                  {getStatusIcon(task.status)}
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-200">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-3">Agents Used:</p>
                  <div className="flex flex-wrap gap-2">
                    {task.agentsUsed.map((agent, index) => (
                      <span key={index} className="px-3 py-1 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 text-xs rounded-full font-medium border border-purple-300">
                        {agent}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-3">Services Used:</p>
                  <div className="flex flex-wrap gap-2">
                    {task.servicesUsed.map((service, index) => (
                      <span key={index} className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-xs rounded-full font-medium border border-blue-300">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {task.result && (
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200">
                  <p className="text-sm font-bold text-gray-700 mb-2">Result:</p>
                  <p className="text-sm text-gray-600">{task.result}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-bold">Total Tasks</span>
              <span className="text-3xl font-bold text-gray-900">{historyTasks.length}</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-green-700 font-bold">Completed</span>
              <span className="text-3xl font-bold text-green-600">
                {historyTasks.filter(t => t.status === 'completed').length}
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-red-50 border border-red-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-red-700 font-bold">Failed</span>
              <span className="text-3xl font-bold text-red-600">
                {historyTasks.filter(t => t.status === 'failed').length}
              </span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-blue-700 font-bold">Success Rate</span>
              <span className="text-3xl font-bold text-blue-600">
                {Math.round((historyTasks.filter(t => t.status === 'completed').length / historyTasks.length) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};