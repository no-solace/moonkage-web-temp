/**
 * Stand-in for endpoints the backend does not have yet: answers like a request would (async, a copy of the data),
 * so a feature's `api/` can switch to `apiClient` without its callers changing.
 */
const MOCK_LATENCY_MS = 150;

export function mockResponse<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(data)), MOCK_LATENCY_MS);
  });
}
