import { Pessoa } from '@/types/pessoa/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartaoPessoaResumoProps {
  pessoa: Pessoa;
  onExpandir?: () => void;
  expandido?: boolean;
}

export const CartaoPessoaResumo = ({ pessoa, onExpandir, expandido }: CartaoPessoaResumoProps) => {
  const isEncontrado = pessoa.ultimaOcorrencia.dataLocalizacao !== null;
  const idade = pessoa.idade || 'Idade não informada';

  return (
    <div className="relative">
      {pessoa.urlFoto ? (
        <img
          src={pessoa.urlFoto}
          alt={`Foto de ${pessoa.nome}`}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      ) : (
        <div className="w-full h-48 bg-muted rounded-t-lg flex items-center justify-center">
          <User className="h-16 w-16 text-muted-foreground" />
        </div>
      )}
      
      <Badge 
        className={cn(
          "absolute top-2 right-2",
          isEncontrado 
            ? "bg-found text-found-foreground hover:bg-found/90" 
            : "bg-missing text-missing-foreground hover:bg-missing/90"
        )}
      >
        {isEncontrado ? 'LOCALIZADA' : 'DESAPARECIDA'}
      </Badge>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-card-foreground mb-1">
            {pessoa.nome}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{pessoa.sexo}, {idade} anos</span>
            </div>
          </div>
        </div>

        {onExpandir && (
          <button
            onClick={onExpandir}
            className="w-full mt-3 text-sm text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
          >
            {expandido ? 'Ocultar detalhes' : 'Ver mais informações'}
          </button>
        )}
      </div>
    </div>
  );
};