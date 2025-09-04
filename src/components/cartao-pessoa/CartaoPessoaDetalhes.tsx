import { Pessoa } from '@/types/pessoa/api';
import { Calendar, MapPin, Shirt } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartaoPessoaDetalhesProps {
  pessoa: Pessoa;
  expandido: boolean;
}

export const CartaoPessoaDetalhes = ({ pessoa, expandido }: CartaoPessoaDetalhesProps) => {
  const isEncontrado = pessoa.ultimaOcorrencia.dataLocalizacao !== null;
  
  const formataData = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  if (!expandido) return null;

  return (
    <div className={cn(
      "overflow-hidden transition-all duration-500 ease-in-out",
      expandido ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
    )}>
      <div className="px-4 pb-4 space-y-3 border-t border-border/50 pt-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <span className="text-muted-foreground">Data do desaparecimento: </span>
              <span className="text-card-foreground font-medium">
                {formataData(pessoa.ultimaOcorrencia.dtDesaparecimento)}
              </span>
            </div>
          </div>

          {pessoa.ultimaOcorrencia.localDesaparecimentoConcat && (
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-muted-foreground">Local do desaparecimento: </span>
                <span className="text-card-foreground">
                  {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}
                </span>
              </div>
            </div>
          )}

          {isEncontrado && pessoa.ultimaOcorrencia.dataLocalizacao && (
            <div className="flex items-start gap-2 p-2 bg-found/10 rounded-md border border-found/20">
              <Calendar className="h-4 w-4 text-found mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-muted-foreground">Localizada em: </span>
                <span className="text-found font-semibold">
                  {formataData(pessoa.ultimaOcorrencia.dataLocalizacao)}
                </span>
              </div>
            </div>
          )}
        </div>

        {pessoa?.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido && (
          <div className="border-t border-border/30 pt-3">
            <div className="flex items-start gap-2 text-sm">
              <Shirt className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-muted-foreground">Vestimentas no momento do desaparecimento: </span>
                <p className="text-card-foreground mt-1 leading-relaxed">
                  {pessoa?.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground/70 pt-2 border-t border-border/20">
          <p>Informações fornecidas pelas autoridades competentes</p>
        </div>
      </div>
    </div>
  );
};