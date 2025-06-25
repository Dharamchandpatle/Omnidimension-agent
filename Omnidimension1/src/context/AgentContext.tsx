import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Agent {
  id: string;
  type: 'research' | 'caller' | 'scheduler' | 'coordinator';
  status: 'idle' | 'active' | 'completed' | 'error';
  currentTask?: string;
  progress?: number;
}

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  agentId?: string;
}

interface Workflow {
  id: string;
  steps: WorkflowStep[];
}

interface AgentContextType {
  agents: Agent[];
  activeWorkflow?: Workflow;
  updateAgent: (agentId: string, updates: Partial<Agent>) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'research-1',
      type: 'research',
      status: 'active',
      currentTask: 'Searching for dental providers in NYC',
      progress: 65
    },
    {
      id: 'caller-1',
      type: 'caller',
      status: 'idle'
    },
    {
      id: 'scheduler-1',
      type: 'scheduler',
      status: 'idle'
    },
    {
      id: 'coordinator-1',
      type: 'coordinator',
      status: 'active',
      currentTask: 'Orchestrating workflow execution',
      progress: 30
    }
  ]);

  const [activeWorkflow] = useState<Workflow>({
    id: 'workflow-1',
    steps: [
      {
        id: 'step-1',
        title: 'Analyze Request',
        description: 'Parse natural language and identify requirements',
        status: 'completed',
        agentId: 'coordinator-1'
      },
      {
        id: 'step-2',
        title: 'Research Providers',
        description: 'Find dental clinics in my area',
        status: 'active',
        agentId: 'research-1'
      },
      {
        id: 'step-3',
        title: 'Contact Providers',
        description: 'Call providers to check availability',
        status: 'pending',
        agentId: 'caller-1'
      },
      {
        id: 'step-4',
        title: 'Book Appointment',
        description: 'Schedule the appointment and confirm',
        status: 'pending',
        agentId: 'scheduler-1'
      }
    ]
  });

  const updateAgent = (agentId: string, updates: Partial<Agent>) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, ...updates } : agent
    ));
  };

  return (
    <AgentContext.Provider value={{ agents, activeWorkflow, updateAgent }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
};