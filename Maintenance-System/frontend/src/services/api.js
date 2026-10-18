import { authService } from "./authService";
import { ApiError } from '../errors/ApiError.js';

const BASE_URL = 'http://localhost:3000';


async function request(endpoint, options = {}) {
  const token = await authService.getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  
  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  let response;
  try {
    response = await fetch(`${BASE_URL}${endpoint}`, config);
  } catch {
    throw new ApiError('Falha de conexão com o servidor', { code: 'NETWORK_ERROR' });
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new ApiError(errorData?.message || 'Erro na requisição', {
      status: response.status,
      code: errorData?.code || 'UNKNOWN_ERROR',
      field: errorData?.field,
    });
  }

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  return data;
}

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options) => request(endpoint, { ...options, method: 'PUT', body }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
};