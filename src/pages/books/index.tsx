import { Button } from "@/components/ui/button";
import H1 from "@/components/ui/h1";
import { useBooks } from "@/services/books";
import { Link } from "react-router-dom";

const Books = () => {
  const { data: books, isPending } = useBooks(); // react-query

  return (
    <div>
      <H1>Livros</H1>

      {isPending ? (
        <div>Carregando livros...</div>
      ) : (
        <div className="flex gap-3">
          {books?.map(book => (
            <div key={book.id} className="p-2 bg-white rounded-md border w-[320px]">
              <div>
                {book.title}
              </div>

              <div className="text-right">
                <Link to={`/books/${book.id}`}><Button>Acessar</Button></Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
