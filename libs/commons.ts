import axios from 'axios';

/** Le URL du backend */
export const BACKEND_URL = 'http://localhost:8080';

/** Une instance de axios qui n'a pas de baseURL (pour différencier les deux) */
export const axiosApi = axios.create();
/** Une instance de axios qui a le backend comme baseURL pour faire des requêtes au serveur express */
export const axiosBackend = axios.create({ baseURL: BACKEND_URL });

/**
 * Fonction qui test les erreurs des requêtes et retourne un objet uniforme.
 * @param err erreur obtenu d'une requête avec axios
 * @returns Un objet avec un `status` et un `error`
 * @author Roger Montero
 */
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
