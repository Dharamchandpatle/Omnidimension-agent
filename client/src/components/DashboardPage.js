import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SmartSuggestions from './SmartSuggestions';
import VoiceAgent from './VoiceAgent';
import MultimodalInput from './MultimodalInput';
import CalendarIntegration from './CalendarIntegration';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardPage({ onLogout }) {
  const user = useSelector(state => state.auth.user);
  const [layout, setLayout] = useState([
    { i: 'welcome', x: 0, y: 0, w: 2, h: 2 },
    { i: 'voice', x: 2, y: 0, w: 3, h: 3 },
    { i: 'smart', x: 0, y: 2, w: 2, h: 2 },
    { i: 'multi', x: 2, y: 3, w: 2, h: 2 },
    { i: 'calendar', x: 4, y: 1, w: 2, h: 3 }
  ]);

  return (
    <div>
      <div className="dashboard-header">
        <span>Hello, {user?.name || 'User'}!</span>
        <button onClick={onLogout}>Logout</button>
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 6, md: 4, sm: 2, xs: 1 }}
        rowHeight={90}
        onLayoutChange={setLayout}
        isDraggable
        isResizable
      >
        <div key="welcome" className="widget">
          <h3>Welcome!</h3>
          <p>This is your AI-powered dashboard.</p>
        </div>
        <div key="voice" className="widget">
          <VoiceAgent />
        </div>
        <div key="smart" className="widget">
          <SmartSuggestions />
        </div>
        <div key="multi" className="widget">
          <MultimodalInput />
        </div>
        <div key="calendar" className="widget">
          <CalendarIntegration />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}