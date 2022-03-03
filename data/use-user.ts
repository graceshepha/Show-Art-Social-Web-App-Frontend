import useSWR from 'swr';
import { axiosApi } from 'libs/commons';

/**
 * Le fetcher pour {@link useSWR SWR}.
 * @param url route pour fetch les informations
 * @returns Les informations de l'utilisateur
 * @author Bly, Grace Schephatia
 */
const userFetcher = (url: string) =>
  axiosApi.get<User>(url).then((res) => res.data);

/**
 * Fonction à utiliser lorsqu'on veut aller chercher les informations de l'utilisateur connecté.
 * @returns Un object avec les propriétés retournés par {@link useSWR SWR} pour voir l'information
 * @author Roger Montero
 */
export const useUser = () => {
  const { data, error } = useSWR('/api/user/', userFetcher);

  const loading = !data && !error;

  return {
    loading,
    error,
    user: data,
  };
};
