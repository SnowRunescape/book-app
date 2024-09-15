import { Button } from "@/components/ui/button";
import H1 from "@/components/ui/h1";
import { moneyFormat } from "@/lib/utils";
import { useBooks } from "@/services/books";
import { Link } from "react-router-dom";

const Books = () => {
  const { data: books, isPending } = useBooks();

  return (
    <div>
      <div className="flex justify-between">
        <H1>Livros</H1>

        <Link to={`/books/create`}>
          <Button variant="success">Criar Livro</Button>
        </Link>
      </div>

      {isPending ? (
        <div>Carregando livros...</div>
      ) : (
        <div className="flex gap-3">
          {books?.map(book => (
            <div key={book.id} className="relative p-2 bg-white rounded-md border w-[320px]">
              <div className="flex justify-center">
                <img
                  src="https://cdn.awsli.com.br/600x450/2515/2515191/produto/2668231228e31c3de8c.jpg"
                  className="max-h-[210px]"
                />
              </div>

              <h2>
                {book.title}
              </h2>

              <div className="bg-green-500 text-white absolute top-0 right-0 py-1 px-2">
                {moneyFormat(book.price)}
              </div>

              <div className="text-right">

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
