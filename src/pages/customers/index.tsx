import { Button } from "@/components/ui/button";
import H1 from "@/components/ui/h1";
import { useCustomers } from "@/services/customers";
import { Link } from "react-router-dom";

const Customer = () => {
  const { data: customers, isPending } = useCustomers(); // react-query

  return (
    <div>
      <div className="flex justify-between">
        <H1>Clientes</H1>

        <Link to={`/customers/create`}>
          <Button variant="success">Cadastrar Cliente</Button>
        </Link>
      </div>

      {isPending ? (
        <div>Carregando clientes...</div>
      ) : (
        <div className="flex gap-3">
          {customers?.map(book => (
            <div key={book.id} className="p-2 bg-white rounded-md border w-[320px]">
              <div>
                {book.id}
              </div>

              <div className="text-right">
                <Link to={`/customers/${book.id}`}><Button>Acessar</Button></Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Customer;
