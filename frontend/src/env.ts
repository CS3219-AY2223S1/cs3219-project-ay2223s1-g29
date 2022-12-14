const ENV = {
  USER_API: import.meta.env.VITE_USER_API,
  MATCHING_API: import.meta.env.VITE_MATCHING_API,
  COLLAB_API: import.meta.env.VITE_COLLAB_API,
  HISTORY_API: import.meta.env.VITE_HISTORY_API,
  NODE_ENV: import.meta.env.MODE as ('development' | 'production'),
  API_TYPE: import.meta.env.MODE === 'development' ? 'mock' : 'real' as ('mock' | 'real'),
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL,
}

export default ENV