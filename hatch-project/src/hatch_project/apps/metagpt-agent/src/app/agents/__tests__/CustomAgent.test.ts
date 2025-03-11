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