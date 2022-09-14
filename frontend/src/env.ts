const ENV = {
  USER_API: import.meta.env.VITE_USER_API,
  NODE_ENV: import.meta.env.MODE as ('development' | 'production')
}

export default ENV