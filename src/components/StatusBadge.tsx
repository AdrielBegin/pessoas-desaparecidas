import { Pessoa } from '@/types/pessoa/api';
import { obterStatusPessoa, formatarDataLocalizacao } from '@/utils/statusPessoa';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  pessoa: Pessoa;
  showDate?: boolean;
}

export const StatusBadge = ({ pessoa, showDate = false }: StatusBadgeProps) => {
  const status = obterStatusPessoa(pessoa);
  const dataLocalizacao = formatarDataLocalizacao(pessoa.ultimaOcorrencia.dataLocalizacao);
  
  const isLocalizada = status === 'Localizada';
  
  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant={isLocalizada ? 'default' : 'destructive'}
        className={`flex items-center gap-1 ${
          isLocalizada 
            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
            : 'bg-red-100 text-red-800 hover:bg-red-200'
        }`}
      >
        {isLocalizada ? (
          <CheckCircle className="h-3 w-3" />
        ) : (
          <AlertCircle className="h-3 w-3" />
        )}
        {status}
      </Badge>
      
      {showDate && dataLocalizacao && (
        <span className="text-xs text-muted-foreground">
          Localizada em: {dataLocalizacao}
        </span>
      )}
    </div>
  );
};