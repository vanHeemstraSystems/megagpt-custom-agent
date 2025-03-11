# MetaGPT

## MetaGPT Custom Agent

Make sure you have completed [Hatch](HATCH.md) and [Nx](NX.md) before continuing.

The "/hatch-project/src/hatch_project/apps/" directory would be a good location for developing a MetaGPT custom agent! Let's create a new app specifically for your MetaGPT agent:

```
$ npx nx g @nx/react:app metagpt-agent --directory=hatch-project/src/hatch_project/apps/metagpt-agent
```

This is a good choice because:
1. It follows the Nx monorepo structure, keeping your agent code isolated and maintainable
2. You'll get all the benefits of Nx tooling (testing, building, dependency management)
3. The location apps/metagpt-agent clearly indicates this is a standalone application within your workspace

Looking at the MetaGPT repository, you'll likely need to:
1. Create components for agent interaction
2. Set up API integration with MetaGPT
3. Implement the agent's role and behaviors
4. Handle message flows and state management

After creating the app, you can:
Start development with:

```
$ npx nx serve metagpt-agent
```

Create new components with:

```
$ npx nx g @nx/react:component my-component --directory=apps/metagpt-agent/src/app
```

Run "nx show project metagpt-agent" to view details about this project.



## Next Steps

1. Create components for agent interaction

Based on the MetaGPT architecture, we'll need to create several key components. Here's the initial structure:

```
metagpt-custom-agent/
└── hatch-project/
    └── src/
        └── hatch_project/
            └── apps/
                └── metagpt-agent/
                    └── src/
                        └── app/
                            ├── agents/
                            │   └── CustomAgent.ts
                            ├── types/
                            │   └── index.ts
                            ├── components/
                            │   └── AgentChat.tsx
                            └── app.tsx
```

```
import { Role, Message, UserMessage } from './types';

class CustomAgent implements Role {
  name: string;
  profile: string;
  goal: string;
  constraints: string[];
  
  constructor() {
    this.name = "CustomAgent";
    this.profile = "I am a specialized agent that helps with specific tasks";
    this.goal = "To assist users with their specific needs efficiently";
    this.constraints = [
      "Follow user instructions carefully",
      "Maintain context throughout the conversation",
      "Provide clear and concise responses"
    ];
  }

  async run(message: UserMessage): Promise<Message> {
    // Main logic for processing user messages
    try {
      // Process the message and generate response
      const response = await this.processMessage(message);
      return {
        content: response,
        role: this.name,
        type: 'response'
      };
    } catch (error) {
      console.error('Error in agent processing:', error);
      return {
        content: 'Sorry, I encountered an error processing your request.',
        role: this.name,
        type: 'error'
      };
    }
  }

  private async processMessage(message: UserMessage): Promise<string> {
    // Implement your custom logic here
    // This is where you'll add the specific behavior for your agent
    return `Processed message: ${message.content}`;
  }
}

export default CustomAgent;
```
CustomAgent.ts

```
export interface Message {
  content: string;
  role: string;
  type: 'response' | 'error' | 'user';
}

export interface UserMessage extends Message {
  type: 'user';
}

export interface Role {
  name: string;
  profile: string;
  goal: string;
  constraints: string[];
  run(message: UserMessage): Promise<Message>;
}
```
index.ts

```
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
```
AgentChat.tsx

```
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
```
app.tsx

This creates a basic structure for your custom MetaGPT agent with:
1. A CustomAgent class that implements the MetaGPT Role interface
2. Type definitions for Messages and Roles
3. A React component for chat interaction
4. A basic UI for testing the agent

To extend this further, you'll want to:
1. Implement specific logic in the processMessage method of CustomAgent
2. Add more sophisticated message handling
3. Integrate with MetaGPT's LLM capabilities
4. Add error handling and recovery
5. Implement memory/context management


== WE ARE HERE ==


2. Set up API integration with MetaGPT
3. Implement the agent's role and behaviors

