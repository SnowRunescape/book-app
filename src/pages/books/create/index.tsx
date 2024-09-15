import { Button } from "@/components/ui/button";
import H1 from "@/components/ui/h1";
import { InputWithLabel } from "@/components/ui/input-with-label";
import { notification } from "@/helpers/notification";
import { useCreateBook } from "@/services/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  author: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  price: z.string().min(2, 'A senha deve ter pelo menos 2 caracteres'),
  isbn: z.string().min(2, 'A senha deve ter pelo menos 2 caracteres'),
  stock: z.string().min(2, 'A senha deve ter pelo menos 2 caracteres'),
});

type FormData = z.infer<typeof schema>;

const BookCreate = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useCreateBook();
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    mutateAsync(data).then(_ => {
      notification('Livro criado com sucesso!', 'success');
      navigate('/books');
    }).catch(error => {
      const message = error.response.data[0]?.message ?? 'Aconteceu um erro, tente novamente!';

      notification(message, 'warning');
    });
  }

  const onError = (errors: FieldErrors<FormData>) => {
    const error = Object.values(errors)[0];

    notification(error?.message ?? 'Aconteceu um erro, tente novamente!', 'warning');
  };

  return (
    <div>
      <H1>Criar Livro</H1>

      <form className="flex flex-col gap-3 p-2 bg-white rounded-md border" onSubmit={handleSubmit(onSubmit, onError)}>
        <InputWithLabel label="Titulo" {...register('title')} />

        <InputWithLabel label="Autor" {...register('author')} />
        <InputWithLabel label="Preço" {...register('price')} />
        <InputWithLabel label="ISBN" {...register('isbn')} />
        <InputWithLabel label="Estoque" {...register('stock')} />

        <div>
          <Button variant="success">Salvar</Button>
        </div>
      </form>
    </div>
  );
};

export default BookCreate;
