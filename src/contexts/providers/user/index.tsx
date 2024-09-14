
import { User } from '@/types/User';
import { ReactNode, useContext, useMemo, useState } from 'react';
import { UserContext } from './context';

export const UserProvider = (props: {
  children: ReactNode
}) => {
  const { children } = props;
  const [user, setUser] = useState<User>({} as User);

  const contextValue = useMemo(() => {
    return { user, setUser };
  }, [user, setUser]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
