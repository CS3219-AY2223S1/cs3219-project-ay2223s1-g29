export const EmitEvents = {
  CONNECT: "connection",
  DISCONNECT: "disconnect",
  JOIN_ROOM: "joinRoom",
  LEAVE_ROOM: "leaveRoom",
  SEND_MSG: "chatMessage"
}

export const ListenEvents = {
  RCV_MESSAGE: 'message'
}

export type ChatMsg = {
  content: string,
  from: string
}