import React from 'react';
import { Brain, Phone, Calendar, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useAgent } from '../context/AgentContext';

export const AgentDashboard: React.FC = () => {
  const { agents, activeWorkflow } = useAgent();

  const agentTypes = [
    { id: 'research', name: 'Research Agent', icon: Search, gradient: 'from-green-400 to-emerald-600' },
    { id: 'caller', name: 'Call Agent', icon: Phone, gradient: 'from-blue-400 to-blue-600' },
    { id: 'scheduler', name: 'Schedule Agent', icon: Calendar, gradient: 'from-purple-400 to-purple-600' },
    { id: 'coordinator', name: 'Coordinator', icon: Brain, gradient: 'from-orange-400 to-orange-600' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4 text-amber-500 animate-pulse" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-xl">
      <h2 className="text-3xl font-bold mb-8 flex items-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-xl mr-4 shadow-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        Agent Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {agentTypes.map((type) => {
          const agent = agents.find(a => a.type === type.id);
          const Icon = type.icon;
          
          return (
            <div key={type.id} className="bg-white/80 rounded-xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${type.gradient} shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                {agent && getStatusIcon(agent.status)}
              </div>
              
              <h3 className="font-bold text-gray-900 mb-2">{type.name}</h3>
              <p className="text-sm text-gray-600">
                {agent ? agent.currentTask || 'Ready' : 'Idle'}
              </p>
              
              {agent && agent.progress && (
                <div className="mt-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 bg-gradient-to-r ${type.gradient}`}
                      style={{ width: `${agent.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-medium">{agent.progress}% complete</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {activeWorkflow && (
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200/50 shadow-lg">
          <h3 className="font-bold text-gray-900 mb-6 text-xl">Active Workflow</h3>
          <div className="space-y-4">
            {activeWorkflow.steps.map((step, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-white/60 border border-gray-200/50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg ${
                  step.status === 'completed' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                  step.status === 'active' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                  step.status === 'error' ? 'bg-gradient-to-br from-red-400 to-red-600' : 'bg-gradient-to-br from-gray-400 to-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-semibold">{step.title}</p>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                {getStatusIcon(step.status)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};