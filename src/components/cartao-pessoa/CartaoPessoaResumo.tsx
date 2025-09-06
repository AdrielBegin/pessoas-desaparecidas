import { Pessoa } from '@/types/pessoa/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <Image
            src={pessoa.urlFoto}
            alt={`Foto de ${pessoa.nome}`}
            fill
            className="object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Kcp"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
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