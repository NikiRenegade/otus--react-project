export function normalizeApiError(err: unknown): { name?: string; message: string } {
  if (!err) return { message: 'Unknown error' };
  if (typeof err === 'string') return { message: err };
  try {
    const anyErr = err as any;
    const name = anyErr?.data?.errors?.[0]?.name ?? anyErr?.name;
    const message = anyErr?.data?.errors?.[0]?.message ?? anyErr?.message ?? JSON.stringify(err);
    return { name, message };
  } catch (e) {
    return { message: 'Unknown error' };
  }
}
