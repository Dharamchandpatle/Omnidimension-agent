import React from 'react';
import ReactDOM from 'react-dom/client';
import { AgentProvider } from './context/AgentContext';
import { ServiceIntegrations } from './components/ServiceIntegrations';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AgentProvider>
      <ServiceIntegrations />
    </AgentProvider>
  </React.StrictMode>
);
