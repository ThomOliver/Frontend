import { render, screen, fireEvent } from '@testing-library/react';
import MessageInput from '../MessageInput';
import { describe, it, expect } from 'vitest';

describe('MessageInput', () => {
  it('renders input and send button', () => {
    render(<MessageInput />);

    expect(
      screen.getByPlaceholderText('Digite sua mensagem...')
    ).toBeInTheDocument();

    expect(screen.getByText('Enviar')).toBeInTheDocument();
  });

  it('allows typing in the input', () => {
    render(<MessageInput />);

    const input = screen.getByPlaceholderText(
      'Digite sua mensagem...'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Olá' } });

    expect(input.value).toBe('Olá');
  });
});
