import { User } from '@/types/User';

export type UserContextType = {
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
};
