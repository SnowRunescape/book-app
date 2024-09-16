import ImageUploadInput from "@/components/ImageUploadInput";
import { Button } from "@/components/ui/button";
import H1 from "@/components/ui/h1";
import { InputWithLabel } from "@/components/ui/input-with-label";
import { Label } from "@/components/ui/label";
import { notification } from "@/helpers/notification";
import { useCreateBook } from "@/services/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(2, "O título deve ter pelo menos 2 caracteres"),
  author: z.string().min(2, "O nome do autor deve ter pelo menos 2 caracteres"),
  price: z.string().min(1, "O preço deve ser informado"),
  isbn: z.string().min(10, "O ISBN deve ter pelo menos 10 caracteres"),
  stock: z.string().min(1, "A quantidade em estoque deve ser informada"),
  image: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const BookCreate = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useCreateBook();
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    mutateAsync(data)
      .then((_) => {
        notification("Livro cadastrado com sucesso!", "success");
        navigate("/books");
      })
      .catch((error) => {
        const message =
          error.response.data[0]?.message ??
          "Aconteceu um erro, tente novamente!";

        notification(message, "warning");
      });
  };

  const onError = (errors: FieldErrors<FormData>) => {
    console.log(watch());
    const error = Object.values(errors)[0];

    notification(
      error?.message ?? "Aconteceu um erro, tente novamente!",
      "warning"
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <H1>Cadastrar Livro</H1>

      <form
        className="flex flex-col gap-3 p-2 bg-white rounded-md border"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Imagem</Label>
          <ImageUploadInput onUpload={(path) => setValue('image', path)} />
        </div>

        <InputWithLabel label="Título" {...register("title")} />
        <InputWithLabel label="Autor" {...register("author")} />
        <InputWithLabel label="Preço" {...register("price")} />
        <InputWithLabel label="ISBN" {...register("isbn")} />
        <InputWithLabel label="Estoque" {...register("stock")} />

        <div>
          <Button variant="success">Salvar</Button>
        </div>
      </form>
    </div>
  );
};

export default BookCreate;
