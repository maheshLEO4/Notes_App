const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function getToken() {
  return localStorage.getItem('token')
}

function authHeaders() {
  return {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  }
}

async function handleResponse(res) {
  const data = await res.json()
  if (!res.ok) throw new Error(data.detail || 'Request failed')
  return data
}

// Auth
export async function signup({ name, email, password }) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  return handleResponse(res)
}

export async function login({ email, password }) {
  // OAuth2PasswordRequestForm expects form-encoded data
  const form = new URLSearchParams()
  form.append('username', email)
  form.append('password', password)

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  })
  return handleResponse(res)
}

export async function logout() {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: authHeaders(),
  })
  return handleResponse(res)
}

export async function getProfile() {
  const res = await fetch(`${BASE_URL}/auth/profile`, {
    headers: authHeaders(),
  })
  return handleResponse(res)
}

// Notes
export async function getNotes() {
  const res = await fetch(`${BASE_URL}/notes/`, {
    headers: authHeaders(),
  })
  return handleResponse(res)
}

export async function createNote({ title, status, content }) {
  const res = await fetch(`${BASE_URL}/notes/notes`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ title, status, content }),
  })
  return handleResponse(res)
}

export async function updateNote(id, fields) {
  const res = await fetch(`${BASE_URL}/notes/notes/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(fields),
  })
  return handleResponse(res)
}

export async function deleteNote(id) {
  const res = await fetch(`${BASE_URL}/notes/notes/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  return handleResponse(res)
}

export async function getNote(id) {
  const res = await fetch(`${BASE_URL}/notes/notes/${id}`, {
    headers: authHeaders(),
  })
  return handleResponse(res)
}
