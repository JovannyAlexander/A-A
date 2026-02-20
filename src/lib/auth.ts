const SESSION_KEY = 'admin_session_aa'

function getExpectedUser(): string {
  return import.meta.env.VITE_ADMIN_USER || 'admin'
}

function getExpectedPassword(): string {
  return import.meta.env.VITE_ADMIN_PASSWORD || 'admin'
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'true'
}

export function login(user: string, password: string): boolean {
  const expectedUser = getExpectedUser().toLowerCase().trim()
  const expectedPass = getExpectedPassword()
  const ok = user.toLowerCase().trim() === expectedUser && password === expectedPass
  if (ok) {
    sessionStorage.setItem(SESSION_KEY, 'true')
    return true
  }
  return false
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY)
}
