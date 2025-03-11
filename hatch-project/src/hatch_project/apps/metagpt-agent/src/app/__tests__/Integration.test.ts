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