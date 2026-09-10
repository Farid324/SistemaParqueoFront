// ─────────────────────────────────────────────────────────────
// Cliente API centralizado — SistemaParqueoFront
//
// TODAS las llamadas al backend pasan por este archivo.
// La URL base se lee de la variable de entorno NEXT_PUBLIC_API_URL,
// así para producción (Vercel) solo cambias UN valor y todo funciona.
// ─────────────────────────────────────────────────────────────

import type { ApiError } from '../types/types';

/**
 * URL base de la API del backend.
 * - Desarrollo: http://localhost:4000/api
 * - Producción: https://tu-backend-url.com/api
 *
 * Se configura en el archivo .env con la variable NEXT_PUBLIC_API_URL.
 * Next.js la inyecta automáticamente en el bundle del cliente.
 */
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

/**
 * Error personalizado para errores de la API.
 * Incluye el status code y el cuerpo de error del backend.
 */
export class ApiRequestError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly body: ApiError,
  ) {
    const msg = Array.isArray(body.message)
      ? body.message.join(', ')
      : body.message;
    super(msg);
    this.name = 'ApiRequestError';
  }
}

/** Opciones para las peticiones al API */
interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  /** Token JWT para rutas protegidas */
  token?: string;
}

/**
 * Función centralizada para hacer peticiones al backend.
 * Agrega automáticamente:
 * - El prefijo /api
 * - Content-Type: application/json
 * - Authorization header si se provee un token
 * - Manejo de errores estandarizado
 *
 * @param endpoint - Ruta relativa al API (ej: '/health', '/users')
 * @param options - Opciones de fetch + body como objeto + token JWT
 * @returns La respuesta parseada como JSON
 *
 * @example
 * // GET /api/health
 * const health = await apiFetch<HealthStatus>('/health');
 *
 * @example
 * // POST /api/users con body
 * const user = await apiFetch<User>('/users', {
 *   method: 'POST',
 *   body: { email: 'admin@test.com', name: 'Admin', password: '123456' },
 * });
 */
export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { body, token, headers: customHeaders, ...restOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((customHeaders as Record<string, string>) ?? {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...restOptions,
    headers,
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorBody: ApiError;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = {
        statusCode: response.status,
        message: response.statusText || 'Error desconocido',
      };
    }
    throw new ApiRequestError(response.status, errorBody);
  }

  // Algunos endpoints pueden devolver 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

// ─────────────────────────────────────────────────────────────
// Atajos tipados para los métodos HTTP más comunes
// ─────────────────────────────────────────────────────────────

/** GET request tipado */
export function apiGet<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  return apiFetch<T>(endpoint, { ...options, method: 'GET' });
}

/** POST request tipado */
export function apiPost<T>(endpoint: string, body?: unknown, options?: FetchOptions): Promise<T> {
  return apiFetch<T>(endpoint, { ...options, method: 'POST', body });
}

/** PUT request tipado */
export function apiPut<T>(endpoint: string, body?: unknown, options?: FetchOptions): Promise<T> {
  return apiFetch<T>(endpoint, { ...options, method: 'PUT', body });
}

/** PATCH request tipado */
export function apiPatch<T>(endpoint: string, body?: unknown, options?: FetchOptions): Promise<T> {
  return apiFetch<T>(endpoint, { ...options, method: 'PATCH', body });
}

/** DELETE request tipado */
export function apiDelete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  return apiFetch<T>(endpoint, { ...options, method: 'DELETE' });
}
