'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiService } from '@/services/pessoa/api';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DetalhesPessoa as DetelhasPessoaTypes } from '@/types/pessoa/api';
import { ResumoInformacoesPessoa } from '@/components/informar/ResumoInformacoesPessoa';
import { FormularioEnvioInformacoes } from '@/components/informar/FormularioEnvioInformacoes';
import Image from 'next/image';

export default function SubmitInformationPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const id = params?.id as string;

  const [pessoa, setPessoa] = useState<DetelhasPessoaTypes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await apiService.getDetalhesPessoa(parseInt(id));
        setPessoa(data);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar os detalhes da pessoa.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPersonDetails();
  }, [id, toast]);



  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!pessoa) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Pessoa não encontrada</h2>
          <Button onClick={() => router.push('/')}>
            Voltar à página inicial
          </Button>
        </div>
      </div>
    );
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
          onClick={() => router.push(`/pessoa/${id}`)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar aos Detalhes
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ResumoInformacoesPessoa pessoa={pessoa} />
          </div>

          <div className="lg:col-span-2">
            <FormularioEnvioInformacoes pessoa={pessoa} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}