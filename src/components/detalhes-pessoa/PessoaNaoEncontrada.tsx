import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function PessoaNaoEncontrada() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <AlertTriangle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Pessoa não encontrada</h2>
        <p className="text-muted-foreground mb-4">
          Não foi possível encontrar informações sobre esta pessoa.
        </p>
        <Button onClick={() => router.push('/')}>
          Voltar à página inicial
        </Button>
      </div>
    </div>
  );
}