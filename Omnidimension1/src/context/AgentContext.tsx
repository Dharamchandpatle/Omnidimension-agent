// src/context/AgentContext.tsx
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export type AgentStatus = 'idle' | 'active' | 'completed' | 'error' | 'scheduled';
export interface Agent {
  id: number;
  name: string;
  type: 'research'|'caller'|'scheduler'|'coordinator';
  status: AgentStatus;
  currentTask?: string;
  progress?: number; // 0-100
}

export interface WorkflowStep {
  title: string;
  description: string;
  status: 'pending'|'active'|'completed'|'error';
}

export interface Workflow {
  steps: WorkflowStep[];
}

interface AgentContextType {
  agents: Agent[];
  activeWorkflow: Workflow | null;
  dispatchCall: (agent_id: number, to_number: string, call_context: any) => Promise<any>;
  getCallLogs: (page?: number, page_size?: number, agent_id?: number) => Promise<any[]>;
}

const AgentContext = createContext<AgentContextType|undefined>(undefined);

export const AgentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow|null>(null);

  // 1) बेस URL सेट
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  // 2) Agents लोड करो
  useEffect(() => {
    axios.get<Agent[]>('/agents/')
      .then(res => {
        // API से केवल id+name मिलता है, बाकी फील्ड mock कर रहे:
        const list = res.data.map(a => ({
          ...a,
          type: detectType(a.name),   // helper जो name देखकर type निकालता
          status: 'idle' as AgentStatus,
          currentTask: undefined,
          progress: 0
        }));
        setAgents(list);
      })
      .catch(console.error);
  }, []);

  // helper: agent.name से type निकलवाएं
  const detectType = (name: string) => {
    if (name.toLowerCase().includes('search')) return 'research';
    if (name.toLowerCase().includes('appointment')) return 'caller';
    // आदि...
    return 'coordinator';
  };

  // 3) Dispatch Call
  const dispatchCall = async (agent_id: number, to_number: string, call_context: any) => {
    const { data } = await axios.post('/calls/dispatch', {
      agent_id, to_number, call_context
    });
    return data;
  };

  // 4) Get Call Logs
  const getCallLogs = async (page = 1, page_size = 30, agent_id?: number) => {
    const params: any = { page, page_size };
    if (agent_id) params.agent_id = agent_id;
    const { data } = await axios.get<any[]>('/calls/logs', { params });
    return data;
  };

  // 5) Mock Active Workflow (आप इसे /api/tasks/ से भी ला सकते हैं)
  useEffect(() => {
    // Example मेहनताना: हर बार Agents बदलें तो workflow रीसेट
    setActiveWorkflow({
      steps: [
        { title: 'Research Providers', description: 'Finding best matches', status: 'completed' },
        { title: 'Contact Provider', description: 'Calling clinic', status: 'active' },
        { title: 'Schedule', description: 'Adding to calendar', status: 'pending' },
        { title: 'Confirmation', description: 'Final check', status: 'pending' },
      ]
    });
  }, [agents]);

  return (
    <AgentContext.Provider value={{
      agents,
      activeWorkflow,
      dispatchCall,
      getCallLogs
    }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error('useAgent must be used inside AgentProvider');
  return ctx;
};
