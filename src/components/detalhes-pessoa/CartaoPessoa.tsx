import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DetalhesPessoa } from '@/types/pessoa/api';
import Image from 'next/image';

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
            <div className="relative w-full aspect-square overflow-hidden rounded-t-lg">
              <Image
                src={pessoa.urlFoto}
                alt={`Foto de ${pessoa.nome}`}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Kcp"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
              />
            </div>
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