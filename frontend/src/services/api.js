const BASE_URL = 'http://localhost:8000/api';

function getToken() {
  return localStorage.getItem('token');
}

async function request(method, path, body = null) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json();

  if (!res.ok) {
    const message =
      data?.message ||
      (data?.errors ? Object.values(data.errors).flat().join(' ') : 'Erro desconhecido');
    throw new Error(message);
  }

  return data;
}

// Auth
export const register = (name, email, password) =>
  request('POST', '/register', { name, email, password, password_confirmation: password });

export const login = (email, password) =>
  request('POST', '/login', { email, password });

export const logout = () =>
  request('POST', '/logout');

// Recados
export const getRecados = () => request('GET', '/recados');

export const createRecado = (titulo, texto) =>
  request('POST', '/recados', { titulo, texto });

export const deleteRecado = (id) =>
  request('DELETE', `/recados/${id}`);
