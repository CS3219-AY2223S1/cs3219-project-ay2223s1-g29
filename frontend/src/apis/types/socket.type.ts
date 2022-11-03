export const EmitEvents = {
  CONNECT: "connection",
  DISCONNECT: "disconnect",
  JOIN_ROOM: "join-room",
  LEAVE_ROOM: "leave-room",
  SEND_MSG: "chatMessage"
}

export const ListenEvents = {
  USER_JOIN: "user-join",
  USER_LEAVE: "user-leave",
  RCV_MESSAGE: 'message'
}

export type ChatMsg = {
  content: string,
  from: string
}