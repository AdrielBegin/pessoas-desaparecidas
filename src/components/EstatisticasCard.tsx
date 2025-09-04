import { Estatisticas } from '@/types/pessoa/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, AlertTriangle } from 'lucide-react';

interface EstatisticasCardProps {
  estatisticas: Estatisticas;
}

export const EstatisticasCard = ({ estatisticas }: EstatisticasCardProps) => {
  const total = estatisticas.quantPessoasDesaparecidas + estatisticas.quantPessoasEncontradas;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Pessoas</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Registros no sistema
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Desaparecidas</CardTitle>
          <AlertTriangle className="h-4 w-4 text-missing" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-missing">
            {estatisticas.quantPessoasDesaparecidas.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Aguardando localização
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Localizadas</CardTitle>
          <UserCheck className="h-4 w-4 text-found" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-found">
            {estatisticas.quantPessoasEncontradas.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Casos resolvidos
          </p>
        </CardContent>
      </Card>
    </div>
  );
};