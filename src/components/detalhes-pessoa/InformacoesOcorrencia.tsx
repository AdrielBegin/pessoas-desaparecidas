import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Info } from 'lucide-react';
import { DetalhesPessoa } from '@/types/pessoa/api';

interface InformacoesOcorrenciaProps {
  pessoa: DetalhesPessoa;
}

export function InformacoesOcorrencia({ pessoa }: InformacoesOcorrenciaProps) {
  const isFound = pessoa.ultimaOcorrencia.dataLocalizacao !== null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Informações da Ocorrência
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm font-medium">Data do Desaparecimento</p>
                <p className="text-card-foreground">
                  {formatDate(pessoa.ultimaOcorrencia.dtDesaparecimento)}
                </p>
              </div>
            </div>
          </div>

          {pessoa.ultimaOcorrencia.localDesaparecimentoConcat && (
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-sm font-medium">Local do Desaparecimento</p>
                  <p className="text-card-foreground">
                    {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}
                  </p>
                </div>
              </div>
            </div>
          )}

          {isFound && pessoa.ultimaOcorrencia.dataLocalizacao && (
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-found mt-1" />
                <div>
                  <p className="text-sm font-medium text-found">Data da Localização</p>
                  <p className="text-found font-medium">
                    {formatDate(pessoa.ultimaOcorrencia.dataLocalizacao)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Vestimentas no Desaparecimento</p>
            <p className="text-card-foreground bg-muted p-3 rounded-md">
              {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}
            </p>
          </div>
        )}

        {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Informações Adicionais</p>
            <p className="text-card-foreground bg-muted p-3 rounded-md">
              {pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
            </p>
          </div>
        )}

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            <strong>ID da Ocorrência:</strong> {pessoa.ultimaOcorrencia.ocoId}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}