import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { DetalhesPessoa } from '@/types/pessoa/api';

interface BotaoEnviarInformacoesProps {
  pessoa: DetalhesPessoa;
}

export function BotaoEnviarInformacoes({ pessoa }: BotaoEnviarInformacoesProps) {
  const router = useRouter();
  const isFound = pessoa.ultimaOcorrencia.dataLocalizacao !== null;

  if (isFound) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Você tem informações sobre esta pessoa?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Se você possui informações que possam ajudar na localização desta pessoa,
          clique no botão abaixo para enviar suas informações às autoridades.
        </p>
        <Button
          size="lg"
          onClick={() => router.push(`/informar/${pessoa.id}`)}
          className="w-full md:w-auto"
        >
          Enviar Informações
        </Button>
      </CardContent>
    </Card>
  );
}