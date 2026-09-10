// ─────────────────────────────────────────────────────────────
// Servicio de Health Check — SistemaParqueoFront
// Consume: GET /api/health
// ─────────────────────────────────────────────────────────────

import { apiGet } from './api';
import type { HealthStatus } from '../types/types';

/**
 * Servicio para verificar el estado del backend.
 *
 * @example
 * import { healthService } from '@/app/services/health.service';
 *
 * const status = await healthService.check();
 * console.log(status.status); // 'ok'
 */
export const healthService = {
  /**
   * Verifica que el backend esté funcionando correctamente.
   * @returns Estado del servidor con timestamp y uptime
   */
  check: (): Promise<HealthStatus> => apiGet<HealthStatus>('/health'),
};
