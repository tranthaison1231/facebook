export const setToken = (token: string) => {
  localStorage.setItem('token', token)
  window.dispatchEvent(new CustomEvent('local-storage'))
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const removeToken = () => {
  localStorage.removeItem('token')
  window.dispatchEvent(new CustomEvent('local-storage'))
}
