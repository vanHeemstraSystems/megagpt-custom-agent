import React from 'react';
import AgentChat from './components/AgentChat';

export function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">MetaGPT Custom Agent</h1>
        <AgentChat />
      </div>
    </div>
  );
}

export default App;
