import { useUser } from '@auth0/nextjs-auth0';
import React, { createContext, useEffect, useState } from 'react';

type UserDetails = {
  username: string;
};

export type UserDetailsContext = {
  userDetails?: UserDetails;
  error?: Error;
  isLoading: boolean;
};

const missingProvider = 'You forgot to wrap your app in <UserDetailsProvider>';

export const UserDetailsContext = createContext<UserDetailsContext>({
  get userDetails(): never {
    throw new Error(missingProvider);
  },
  get error(): never {
    throw new Error(missingProvider);
  },
  get isLoading(): never {
    throw new Error(missingProvider);
  },
});

export type UserDetailsProviderProps = React.PropsWithChildren<{
  user: string;
}>;

export type UserDetailsProviderState = {
  userDetails?: UserDetails;
  isLoading: boolean;
};

export type UserDetailsProvider = (
  props: UserDetailsProviderProps
) => React.ReactElement<UserDetailsContext>;

const UserDetailsProvider: UserDetailsProvider = ({ children }) => {
  const { user } = useUser();
  const [state, setState] = useState<UserDetailsProviderState>({
    userDetails: undefined,
    isLoading: false,
  });
  useEffect(() => {
    if (!user) return;
    (async () => {
      // TODO FETCH USER DETAILS
    })();
  }, [user]);
  const { userDetails, isLoading } = state;
  return (
    <UserDetailsContext.Provider value={{ userDetails, isLoading }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export default UserDetailsProvider;
