import { Button } from '@/components/ui/button';
import { InputWithLabel } from '@/components/ui/input-with-label';
import { useUser } from '@/contexts/providers/user';
import { notification } from '@/helpers/notification';
import { useLogin } from '@/services/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { mutateAsync } = useLogin();
  const { setUser } = useUser();

  const handleLogin = (data: any) => {
    mutateAsync(data).then(response => {
      localStorage.setItem('authorization', response.token);

      setUser(response.user);

      notification('logado com sucesso', 'success');
      navigate('/');
    }).catch(error => {
      notification(error.message, 'warning');
    });
  }

  return (
    <div className="flex w-full h-screen items-center justify-center bg-gray-100">
      <form className="flex flex-col gap-3 w-[350px] border p-3 rounded-md bg-white" onSubmit={handleSubmit(handleLogin)}>
        <div>
          <InputWithLabel
            label="Login"
            type="text"
            placeholder="login"
            {...register('login')}
            defaultValue="snowrunescape"
          />
        </div>

        <div>
          <InputWithLabel
            label="Senha"
            type="text"
            placeholder="senha"
            {...register('password')}
            defaultValue="123456"
          />
        </div>

        <Button type="submit">Entrar</Button>
        <Button type="button" variant="outline">Login Com Google</Button>
      </form>
    </div>
  );
};

export default Login;
