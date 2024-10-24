import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import { useToDoContext } from '../context/ToDoContext.tsx';
import { Button, ButtonGroup, Pagination } from "react-bootstrap";
export function PaginationGroup() {
  const { currentPage, totalPages, setCurrentPage } = useToDoContext();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Actualiza la página en el contexto
    }
  };

  return (
    <ButtonGroup className="flex justify-center">
      <Button variant="outline-secondary"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <NavArrowLeft className="h-4 w-4 stroke-2" />
      </Button>

      {/* Renderizar botones de paginación dinámicamente */}
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index + 1}
          variant={currentPage === index + 1 ? undefined : "outline"}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        variant="outline-secondary"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <NavArrowRight className="h-4 w-4 stroke-2" />
      </Button>
    </ButtonGroup>
  );
}
export default Pagination;