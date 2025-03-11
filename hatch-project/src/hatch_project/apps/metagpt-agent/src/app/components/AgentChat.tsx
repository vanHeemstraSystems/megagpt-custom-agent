import React, { useState } from 'react';
import CustomAgent from '../agents/CustomAgent';

const AgentChat: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ content: string; role: string }>>([]);
  const [input, setInput] = useState('');
  const agent = new CustomAgent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      content: input,
      role: 'user',
      type: 'user' as const
    };
    setMessages(prev => [...prev, userMessage]);

    // Get agent response
    const response = await agent.run(userMessage);
    setMessages(prev => [...prev, response]);
    
    setInput('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-4 mb-4 h-96 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg ${
                msg.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
              } max-w-[80%]`}
            >
              <p className="text-sm font-semibold">{msg.role}</p>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentChat;