export type EmitEvents = {
  CONNECT: "connection",
  DISCONNECT: "disconnect",
  JOIN_ROOM: "joinRoom",
  SEND_MSG: "chatMessage"
}

export type ListenEvents = {
  RCV_MESSAGE: 'message'
}
