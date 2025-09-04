import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EtapaWizard {
  id: string | number; 
  titulo: string;
  descricao: string;
}

interface IndicadorProgressoProps {
  etapas: EtapaWizard[];
  etapaAtual: number;
}

export function IndicadorProgresso({ etapas, etapaAtual }: IndicadorProgressoProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {etapas.map((etapa, index) => {
          const isCompleted = index < etapaAtual;
          const isCurrent = index === etapaAtual;
          const isAccessible = index <= etapaAtual;

          return (
            <div key={etapa.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200",
                    {
                      "bg-primary text-primary-foreground": isCurrent,
                      "bg-green-500 text-white": isCompleted,
                      "bg-muted text-muted-foreground": !isCurrent && !isCompleted,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className={cn(
                    "text-sm font-medium",
                    {
                      "text-primary": isCurrent,
                      "text-green-600": isCompleted,
                      "text-muted-foreground": !isCurrent && !isCompleted,
                    }
                  )}>
                    {etapa.titulo}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {etapa.descricao}
                  </p>
                </div>
              </div>
              
              {index < etapas.length - 1 && (
                <div className="flex-1 h-px mx-4 mt-5">
                  <div
                    className={cn(
                      "h-full transition-all duration-300",
                      {
                        "bg-green-500": index < etapaAtual,
                        "bg-primary": index === etapaAtual,
                        "bg-muted": index > etapaAtual,
                      }
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}