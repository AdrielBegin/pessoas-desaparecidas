import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DetalhesPessoa } from '@/types/pessoa/api';

interface CartaoPessoaProps {
  pessoa: DetalhesPessoa;
}

export function CartaoPessoa({ pessoa }: CartaoPessoaProps) {
  const isFound = pessoa.ultimaOcorrencia.dataLocalizacao !== null;
  const age = pessoa.idade || 'Idade não informada';

  return (
    <Card>
      <CardContent className="p-0">
        <div className="relative">
          {pessoa.urlFoto ? (
            <img
              src={pessoa.urlFoto}
              alt={`Foto de ${pessoa.nome}`}
              className="w-full aspect-square object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full aspect-square bg-muted rounded-t-lg flex items-center justify-center">
              <User className="h-24 w-24 text-muted-foreground" />
            </div>
          )}

          <Badge
            className={cn(
              "absolute top-4 right-4 text-lg px-3 py-1",
              isFound
                ? "bg-found text-found-foreground hover:bg-found/90"
                : "bg-missing text-missing-foreground hover:bg-missing/90"
            )}
          >
            {isFound ? 'LOCALIZADA' : 'DESAPARECIDA'}
          </Badge>
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-card-foreground mb-2">
            {pessoa.nome}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{pessoa.sexo}, {age} anos</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}