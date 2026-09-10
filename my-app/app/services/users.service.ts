// ─────────────────────────────────────────────────────────────
// Servicio de Usuarios — SistemaParqueoFront
// Consume: GET /api/users  |  POST /api/users
// ─────────────────────────────────────────────────────────────

import { apiGet, apiPost } from './api';
import type { User, CreateUserDto } from '../types/types';

/**
 * Servicio para gestionar usuarios del sistema.
 *
 * @example
 * import { usersService } from '@/app/services/users.service';
 *
 * // Obtener todos los usuarios
 * const users = await usersService.getAll();
 *
 * // Crear un nuevo usuario
 * const newUser = await usersService.create({
 *   email: 'admin@parqueo.com',
 *   name: 'Admin',
 *   password: 'Pass1234!',
 *   role: 'ADMIN',
 * });
 */
export const usersService = {
  /**
   * Obtiene la lista de todos los usuarios registrados.
   * @returns Array de usuarios
   */
  getAll: (): Promise<User[]> => apiGet<User[]>('/users'),

  /**
   * Crea un nuevo usuario en el sistema.
   * @param data - Datos del usuario a crear
   * @returns El usuario creado
   */
  create: (data: CreateUserDto): Promise<User> => apiPost<User>('/users', data),
};
