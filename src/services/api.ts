// VELORA API Client
// Ready for backend integration via VITE_API_BASE_URL

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

/**
 * Standard simulated network delay to emulate real-world production API behavior
 */
export async function simulateDelay(ms: number = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generic API request helper prepared for real REST endpoints
 */
export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // If backend is active:
  if (import.meta.env.VITE_USE_REAL_BACKEND === 'true') {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(`Request failed with status ${response.status}`, response.status);
    }

    return response.json() as Promise<T>;
  }

  // Otherwise simulate client-side REST call
  await simulateDelay(200);
  throw new Error('Real backend mode disabled, relying on service mock layer.');
}
