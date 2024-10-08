import { Button } from "@/components/ui/button";
import H1 from "@/components/ui/h1";
import { InputWithLabel } from "@/components/ui/input-with-label";
import { notification } from "@/helpers/notification";
import { isValidCPF } from "@/lib/utils";
import { useCEP } from "@/services/brasilapi";
import { useCreateCustomer } from "@/services/customers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useHookFormMask } from "use-mask-input";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  cpf: z.string().min(11, "O CPF deve ter pelo menos 11 caracteres").refine(isValidCPF, {
    message: 'CPF inválido',
  }),
  cep: z.string().min(8, "O CEP deve ter pelo menos 8 caracteres"),
  street: z.string().min(2, "A rua deve ter pelo menos 2 caracteres"),
  number: z.string().min(1, "O número deve ter pelo menos 1 caractere"),
  city: z.string().min(2, "A cidade deve ter pelo menos 2 caracteres"),
  state: z.string().min(2, "O estado deve ter pelo menos 2 caracteres"),
  complement: z.string().optional(),
  gender: z.string().min(1, "O gênero deve ter pelo menos 1 caractere"),
});

type FormData = z.infer<typeof schema>;

const CustomerCreate = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useCreateCustomer();
  const { register, handleSubmit, setValue, watch, trigger } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const registerWithMask = useHookFormMask(register);

  const cep = useMemo(() => {
    return watch('cep')?.replace(/\D/g, '') ?? '';
  }, [watch('cep')]);

  const { data } = useCEP(cep, {
    enabled: cep.length === 8
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    setValue('street', data.street);
    setValue('state', data.state);
    setValue('city', data.city);
    trigger('cep');
  }, [data]);

  const onSubmit = (data: any) => {
    mutateAsync(data)
      .then((_) => {
        notification("Cliente cadastrado com sucesso!", "success");
        navigate("/customers");
      })
      .catch((error) => {
        const message =
          error.response.data[0]?.message ??
          "Aconteceu um erro, tente novamente!";

        notification(message, "warning");
      });
  };

  const onError = (errors: FieldErrors<FormData>) => {
    const error = Object.values(errors)[0];

    notification(
      error?.message ?? "Aconteceu um erro, tente novamente!",
      "warning"
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <H1>Cadastrar Cliente</H1>

      <form
        className="flex flex-col gap-3 p-2 bg-white rounded-md border"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <InputWithLabel label="Nome" {...register("name")} />

        <InputWithLabel label="CPF" {...registerWithMask("cpf", ['999.999.999-99'])} />
        <InputWithLabel label="CEP" {...registerWithMask("cep", ['99999-999'])} />

        <div className="flex gap-2">
          <InputWithLabel label="Endereço" {...register("street")} readOnly />

          <div>
            <InputWithLabel label="Numero" {...register("number")} />
          </div>
        </div>

        <div className="flex gap-2">
          <div>
            <InputWithLabel label="Cidade" {...register("city")} readOnly />
          </div>

          <div>
            <InputWithLabel label="Estado" {...register("state")} readOnly />
          </div>
        </div>

        <InputWithLabel label="Complemento" {...register("complement")} />
        <InputWithLabel label="Sexo" {...register("gender")} />

        <div>
          <Button variant="success">Salvar</Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerCreate;
