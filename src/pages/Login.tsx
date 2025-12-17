import { useState } from 'react'
import { useChatStore } from '../store/chat.store'
import { useNavigate } from 'react-router-dom'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Login() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const setUser = useChatStore((s) => s.setUser)
  const navigate = useNavigate()

  function handleJoin() {
    if (!username || !room) return;

    setUser(username, room);
    navigate('/chat');
  }

  return (
    <div className="h-screen flex items-center justify-center bg-muted">
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Entrar no chat</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Seu nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            placeholder="Sala"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />

          <Button className="w-full" onClick={handleJoin}>
            Entrar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
