import React, { createContext, useContext, ReactNode, useState } from 'react';

interface DispatchRequest {
  agent_id: number;
  to_number: string;
  call_context?: Record<string, any>;
}

interface DispatchResponse {
  call_id: string;
  status: string;
  raw: Record<string, any>;
}

interface CallLogFilter {
  page?: number;
  page_size?: number;
  agent_id?: number;
}

interface AgentContextType {
  agents: any[];
  activeWorkflow?: any;
  dispatchCall: (agentId: number, to: string, ctx?: Record<string, any>) => Promise<DispatchResponse>;
  getCallLogs: (page?: number, page_size?: number, agent_id?: number) => Promise<DispatchResponse[]>;
  updateAgent: (agentId: string, updates: Partial<any>) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<any[]>([]);
  const [activeWorkflow, setActiveWorkflow] = useState<any>(undefined);

  // Existing updateAgent logic
  const updateAgent = (agentId: string, updates: Partial<any>) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, ...updates } : agent
    ));
  };

  // API integration
  const baseUrl = 'http://127.0.0.1:8000/api/calls';
  
  const dispatchCall = async (
    agentId: number,
    to: string,
    call_context: Record<string, any> = {}
  ): Promise<DispatchResponse> => {
    const res = await fetch(`${baseUrl}/dispatch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agent_id: agentId, to_number: to, call_context }),
    });
    if (!res.ok) throw new Error('Dispatch failed');
    return res.json();
  };

  const getCallLogs = async (
    page = 1,
    page_size = 30,
    agent_id?: number
  ): Promise<DispatchResponse[]> => {
    const params = new URLSearchParams({
      page: String(page),
      page_size: String(page_size),
      ...(agent_id ? { agent_id: String(agent_id) } : {}),
    });
    const res = await fetch(`${baseUrl}/logs?${params.toString()}`);
    if (!res.ok) throw new Error('Fetch logs failed');
    return res.json();
  };

  return (
    <AgentContext.Provider value={{ agents, activeWorkflow, updateAgent, dispatchCall, getCallLogs }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = (): AgentContextType => {
  const context = useContext(AgentContext);
  if (!context) throw new Error('useAgent must be used within AgentProvider');
  return context;
};

