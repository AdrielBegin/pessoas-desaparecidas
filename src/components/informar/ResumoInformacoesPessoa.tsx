import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Calendar, MapPin } from 'lucide-react';
import { DetalhesPessoa } from '@/types/pessoa/api';
import Image from 'next/image';

interface ResumoInformacoesPessoaProps {
  pessoa: DetalhesPessoa;
}

export function ResumoInformacoesPessoa({ pessoa }: ResumoInformacoesPessoaProps) {
  const formataData = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações da Pessoa</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          {pessoa.urlFoto ? (
            <div className="relative w-16 h-16 overflow-hidden rounded-lg">
              <Image
                src={pessoa.urlFoto}
                alt={`Foto de ${pessoa.nome}`}
                fill
                className="object-cover"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Kcp"
                sizes="64px"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-lg">{pessoa.nome}</h3>
            <p className="text-muted-foreground">
              {pessoa.sexo}, {pessoa.idade || 'Idade não informada'} anos
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="font-medium">Desaparecimento: </span>
              <span>{formataData(pessoa.ultimaOcorrencia.dtDesaparecimento)}</span>
            </div>
          </div>

          {pessoa.ultimaOcorrencia.localDesaparecimentoConcat && (
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <span className="font-medium">Local: </span>
                <span>{pessoa.ultimaOcorrencia.localDesaparecimentoConcat}</span>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            <strong>ID da Ocorrência:</strong> {pessoa.ultimaOcorrencia.ocoId}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}