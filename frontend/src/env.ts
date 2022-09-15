const ENV = {
  USER_API: import.meta.env.VITE_USER_API,
  NODE_ENV: import.meta.env.MODE as ('development' | 'production'),
  API_TYPE: import.meta.env.MODE === 'development' ? 'mock' : 'real' as ('mock' | 'real')
}

export default ENV