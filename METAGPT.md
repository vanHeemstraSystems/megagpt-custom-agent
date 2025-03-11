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

## Testing the Custom Agent

```
metagpt-custom-agent/
└── hatch-project/
    └── src/
        └── hatch_project/
            └── apps/
                └── metagpt-agent/
                    ├── src/
                    │   └── app/
                    │       ├── agents/
                    │       │   ├── CustomAgent.ts
                    │       │   └── __tests__/
                    │       │       └── CustomAgent.test.ts
                    │       ├── types/
                    │       │   └── index.ts
                    │       ├── components/
                    │       │   ├── AgentChat.tsx
                    │       │   └── __tests__/
                    │       │       └── AgentChat.test.tsx
                    │       ├── __tests__/
                    │       │   └── integration.test.ts
                    │       └── app.tsx
                    └── e2e/
                        └── app.spec.ts
```

There are several ways to test your Custom Agent. Here's a comprehensive testing approach:

First, create a test file for the Custom Agent:

```
import CustomAgent from '../CustomAgent';

describe('CustomAgent', () => {
  let agent: CustomAgent;

  beforeEach(() => {
    agent = new CustomAgent();
  });

  test('should initialize with correct properties', () => {
    expect(agent.name).toBe('CustomAgent');
    expect(agent.profile).toBeDefined();
    expect(agent.goal).toBeDefined();
    expect(agent.constraints).toBeInstanceOf(Array);
  });

  test('should process user message', async () => {
    const userMessage = {
      content: 'Hello agent',
      role: 'user',
      type: 'user' as const
    };

    const response = await agent.run(userMessage);
    
    expect(response).toMatchObject({
      content: expect.any(String),
      role: 'CustomAgent',
      type: 'response'
    });
  });

  test('should handle empty messages', async () => {
    const userMessage = {
      content: '',
      role: 'user',
      type: 'user' as const
    };

    const response = await agent.run(userMessage);
    expect(response.type).toBe('error');
  });
});
```
CustomAgent.test.ts

2. Create a test file for the AgentChat component:

```
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AgentChat from '../AgentChat';

describe('AgentChat', () => {
  test('renders chat interface', () => {
    render(<AgentChat />);
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  test('sends message and receives response', async () => {
    render(<AgentChat />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Processed message:/)).toBeInTheDocument();
    });
  });
});
```
AgentChat.test.tsx

3. To run the tests, use these commands:

```
# Run all tests
npx nx test metagpt-agent

# Run tests with coverage
npx nx test metagpt-agent --coverage

# Run tests in watch mode during development
npx nx test metagpt-agent --watch
```

4. For manual testing, start the development server:

```
npx nx serve metagpt-agent
```

Then open your browser to http://localhost:4200 (or whatever port is specified) and interact with the agent through the UI.

5. You can also create an integration test:

```
import CustomAgent from '../agents/CustomAgent';
import { UserMessage } from '../types';

describe('Integration Tests', () => {
  let agent: CustomAgent;

  beforeEach(() => {
    agent = new CustomAgent();
  });

  test('complete conversation flow', async () => {
    const messages: UserMessage[] = [
      {
        content: 'Hello',
        role: 'user',
        type: 'user'
      },
      {
        content: 'What can you do?',
        role: 'user',
        type: 'user'
      }
    ];

    for (const message of messages) {
      const response = await agent.run(message);
      expect(response).toMatchObject({
        content: expect.any(String),
        role: 'CustomAgent',
        type: 'response'
      });
    }
  });

  test('error handling', async () => {
    // Test with invalid input
    const invalidMessage = {
      content: undefined as unknown as string,
      role: 'user',
      type: 'user' as const
    };

    const response = await agent.run(invalidMessage);
    expect(response.type).toBe('error');
  });
});
```
Integration.test.ts

6. For E2E testing with Playwright:

```
import { test, expect } from '@playwright/test';

test('agent chat interaction', async ({ page }) => {
  await page.goto('/');

  // Type a message
  await page.fill('input[type="text"]', 'Hello agent');
  await page.click('button[type="submit"]');

  // Wait for response
  await expect(page.locator('text=Processed message:')).toBeVisible();

  // Check message history
  const messages = await page.locator('.space-y-4 > div').count();
  expect(messages).toBe(2); // User message and agent response
});
```
app.spec.ts

To run E2E tests:

```
$ npx nx e2e metagpt-agent
```

Remember to install the necessary testing dependencies:

```
$ npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

This testing setup provides:
1. Unit tests for individual components
2. Integration tests for the agent's logic
3. E2E tests for the complete application
4. Manual testing through the UI


== WE ARE HERE ==

To extend this further, you'll want to:
1. Implement specific logic in the processMessage method of CustomAgent
2. Add more sophisticated message handling
3. Integrate with MetaGPT's LLM capabilities
4. Add error handling and recovery
5. Implement memory/context management




2. Set up API integration with MetaGPT
3. Implement the agent's role and behaviors

