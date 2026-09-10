// ─────────────────────────────────────────────────────────────
// Tipos compartidos del Frontend — SistemaParqueoFront
// Estos tipos reflejan las entidades y DTOs del Backend (NestJS)
// ─────────────────────────────────────────────────────────────

/** Roles de usuario disponibles en el sistema */
export enum Role {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  CUSTOMER = 'CUSTOMER',
}

/** Representa un usuario devuelto por el backend */
export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

/** DTO para crear un nuevo usuario (POST /api/users) */
export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  role?: Role;
}

/** Respuesta del endpoint de health check (GET /api/health) */
export interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: number;
}

/** Error estandarizado devuelto por el backend de NestJS */
export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}
