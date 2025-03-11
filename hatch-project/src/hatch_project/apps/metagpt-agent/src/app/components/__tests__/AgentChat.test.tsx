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