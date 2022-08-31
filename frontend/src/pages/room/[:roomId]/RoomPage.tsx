import React from 'react'
import { useParams } from 'react-router-dom'

export default function RoomPage() {
  const { roomId } = useParams()

  if (!roomId) {
    return null
  }
  return <div>RoomPage</div>
}
