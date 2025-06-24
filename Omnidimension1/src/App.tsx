import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TaskInput } from './components/TaskInput';
import { AgentDashboard } from './components/AgentDashboard';
import { ExecutionMonitor } from './components/ExecutionMonitor';
import { ServiceIntegrations } from './components/ServiceIntegrations';
import { TaskHistory } from './components/TaskHistory';
import { TaskProvider } from './context/TaskContext';
import { AgentProvider } from './context/AgentContext';

function App() {
  const [activeTab, setActiveTab] = useState('orchestrate');

  return (
    <TaskProvider>
      <AgentProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900">
          <Header activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <main className="container mx-auto px-6 py-8">
            {activeTab === 'orchestrate' && (
              <div className="space-y-8">
                <TaskInput />
                <AgentDashboard />
                <ExecutionMonitor />
              </div>
            )}
            
            {activeTab === 'integrations' && <ServiceIntegrations />}
            {activeTab === 'history' && <TaskHistory />}
          </main>
        </div>
      </AgentProvider>
    </TaskProvider>
  );
}

export default App;