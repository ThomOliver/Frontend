import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../Login'
import { describe, it, expect } from 'vitest'

import { vi } from 'vitest'

vi.mock('@/services/socket', () => ({
  socket: { emit: vi.fn() },
}))

vi.mock('@/store/chat.store', () => ({
  useChatStore: () => ({
    setUser: vi.fn(),
  }),
}))

describe('Login', () => {
  it('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    expect(screen.getByText('Entrar no chat')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Seu nome')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Sala')).toBeInTheDocument()
    expect(screen.getByText('Entrar')).toBeInTheDocument()
  })
})
