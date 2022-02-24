import axios from 'axios';

export const BACKEND_URL = 'http://localhost:8080';

export const axiosApi = axios.create();
export const axiosBackend = axios.create({ baseURL: BACKEND_URL });

export const testErrors = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    const status = err?.response?.status || 500;
    return { status, error: err.message };
  } else if (err instanceof Error) {
    return { status: 500, error: err.message };
  } else {
    return { status: 500, error: 'Unknown error' };
  }
};
