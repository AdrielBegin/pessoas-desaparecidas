import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  titulo?: string;
  mensagem?: string;
  tentarNovamente?: () => void;
  mostrarRepetir?: boolean;
}

export const ErrorState = ({ 
  titulo = "Erro ao carregar dados",
  mensagem = "Não foi possível carregar as informações. Tente novamente.",
  tentarNovamente,
  mostrarRepetir = true
}: ErrorStateProps) => {
  return (
    <Card className="p-8">
      <CardContent className="text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-card-foreground">{titulo}</h3>
        <p className="text-muted-foreground mb-6">
          {mensagem}
        </p>
        {mostrarRepetir && tentarNovamente && (
          <Button 
            onClick={tentarNovamente}
            variant="outline"
            className="flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Tentar Novamente
          </Button>
        )}
      </CardContent>
    </Card>
  );
};