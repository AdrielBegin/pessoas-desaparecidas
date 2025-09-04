import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  alterarPagina: (page: number) => void;
  className?: string;
}

export const Paginacao = ({ paginaAtual, totalPaginas, alterarPagina, className }: PaginacaoProps) => {
  if (totalPaginas <= 1) return null;

  const gerarNumerosDePaginas = () => {
    const delta = 2;
    const range = [];
    const intervalosComPontos = [];

    for (let i = Math.max(2, paginaAtual - delta); i <= Math.min(totalPaginas - 1, paginaAtual + delta); i++) {
      range.push(i);
    }

    if (paginaAtual - delta > 2) {
      intervalosComPontos.push(1, '...');
    } else {
      intervalosComPontos.push(1);
    }

    intervalosComPontos.push(...range);

    if (paginaAtual + delta < totalPaginas - 1) {
      intervalosComPontos.push('...', totalPaginas);
    } else {
      if (totalPaginas > 1) {
        intervalosComPontos.push(totalPaginas);
      }
    }

    return intervalosComPontos;
  };

  const paginas = gerarNumerosDePaginas();

  return (
    <div className={cn("flex items-center justify-center space-x-2", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => alterarPagina(paginaAtual - 1)}
        disabled={paginaAtual <= 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      <div className="flex items-center space-x-1">
        {paginas.map((page, index) => {
          if (page === '...') {
            return (
              <Button
                key={`dots-${index}`}
                variant="ghost"
                size="sm"
                disabled
                className="w-10"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            );
          }

          const pageNumber = page as number;
          const ispaginaAtual = pageNumber === paginaAtual;

          return (
            <Button
              key={pageNumber}
              variant={ispaginaAtual ? "default" : "outline"}
              size="sm"
              onClick={() => alterarPagina(pageNumber)}
              className="w-10"
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => alterarPagina(paginaAtual + 1)}
        disabled={paginaAtual >= totalPaginas}
        className="flex items-center gap-1"
      >
        Próxima
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};