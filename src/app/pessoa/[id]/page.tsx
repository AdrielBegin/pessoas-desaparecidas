'use client'

import { useParams, useRouter } from 'next/navigation';
import { useDetalhesPessoa } from '@/hooks/usePessoas';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ErrorState } from '@/components/ErrorState';
import { CartaoPessoa } from '@/components/detalhes-pessoa/CartaoPessoa';
import { InformacoesOcorrencia } from '@/components/detalhes-pessoa/InformacoesOcorrencia';
import { BotaoEnviarInformacoes } from '@/components/detalhes-pessoa/BotaoEnviarInformacoes';
import { EstadoCarregamento } from '@/components/detalhes-pessoa/EstadoCarregamento';
import { PessoaNaoEncontrada } from '@/components/detalhes-pessoa/PessoaNaoEncontrada';
import Image from 'next/image';

export default function DetalhesPessoaPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const id = parseInt(params?.id as string);
  
  const { 
    data: pessoas, 
    isLoading: loading, 
    error,
    refetch 
  } = useDetalhesPessoa(id);

  const handleTentarNovamente = () => {
    refetch();
  };

  if (!loading && error) {
    return (
      <ErrorState
        titulo="Erro ao carregar dados"
        mensagem="Não foi possível carregar as informações. Tente novamente."
        tentarNovamente={handleTentarNovamente}
        mostrarRepetir={true}
      />
    );
  }

  if (loading) {
    return <EstadoCarregamento />;
  }

  if (!pessoas) {
    return <PessoaNaoEncontrada />;
  }



  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Image
                src="/Brasao_PJCMT.ico"
                alt="Logo"
                width={80}
                height={80}
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Polícia Civil do Estado de Mato Grosso</h1>
              <p className="text-sm text-primary-foreground/80">Sistema de Busca de Pessoas Desaparecidas</p>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={() => router.push('/')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CartaoPessoa pessoa={pessoas} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <InformacoesOcorrencia pessoa={pessoas} />
            <BotaoEnviarInformacoes pessoa={pessoas} />
          </div>
        </div>
      </div>
    </div>
  );
}
