import { render, screen } from '@testing-library/react';
import MessageItem from '../MessageItem';
import type { Message } from '@/store/chat.store';
import { describe, it, expect } from 'vitest';

describe('MessageItem', () => {
  it('renders a normal message', () => {
    const message: Message = {
      content: 'Olá mundo',
      username: 'Thomas',
    };

    render(<MessageItem message={message} />);

    expect(screen.getByText('Olá mundo')).toBeInTheDocument();
    expect(screen.getByText('Thomas')).toBeInTheDocument();
  });

  it('renders a system message', () => {
    const message: Message = {
      content: 'Usuário entrou na sala',
      system: true,
    };

    render(<MessageItem message={message} />);

    expect(
      screen.getByText('Usuário entrou na sala')
    ).toBeInTheDocument();
  });
});
