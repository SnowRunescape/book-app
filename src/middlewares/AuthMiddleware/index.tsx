import SplashScreen from '@/components/SplashScreen';
import { useUser as useUserContext } from '@/contexts/providers/user';
import { useUser } from '@/services/user';
import { useEffect, useLayoutEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthMiddleware = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (localStorage.getItem('authorization') === null) {
      navigate('/login');
    }
  });

  const { data, error, isError, isPending, isLoading } = useUser({
    queryKey: ['foda-se'],
    enabled: !!user && localStorage.getItem('authorization') !== null,
  });

  useLayoutEffect(() => {
    if (isPending || !data) {
      return;
    }

    setUser(data);
  }, [data]);

  if (isLoading) {
    return <SplashScreen message="Carregando seu Usuario" />;
  }

  if (isError) {
    if (error.status === 401) {
      localStorage.removeItem('authorization');
      navigate('/login');
      return null;
    }

    return <SplashScreen message={JSON.stringify(error)} />;
  }

  if (Object.keys(user).length == 0 && !data) {
    navigate('/login');
    return null;
  }

  return <Outlet />
}

export default AuthMiddleware;
