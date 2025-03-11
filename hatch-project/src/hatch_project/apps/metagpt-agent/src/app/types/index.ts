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
