import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DetalhesPessoa, EnvioInformacao } from '@/types/pessoa/api';
import { apiService } from '@/services/pessoa/api';
import { useUploadArquivos } from '@/hooks/useUploadArquivos';
import { WizardStep } from './WizardStep';
import { IndicadorProgresso } from './IndicadorProgresso';
import { EtapaInformacoesBasicas } from './EtapaInformacoesBasicas';
import { EtapaDetalhes } from './EtapaDetalhes';
import { EtapaAnexos } from './EtapaAnexos';
import { EtapaRevisao } from './EtapaRevisao';

interface FormularioEnvioInformacoesProps {
  pessoa: DetalhesPessoa;
  id: string;
}

export function FormularioEnvioInformacoes({ pessoa, id }: FormularioEnvioInformacoesProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(0);
  
  const {
    arrastando,
    arquivosEnviados,
    handleArrastarSobreArea,
    handleSairDaAreaArrasto,
    handleDrop,
    handleSelecionarArquivos,
    removerArquivo,
    formatarTamanhoArquivo
  } = useUploadArquivos();

  const [formData, setFormData] = useState({
    informacao: '',
    descricao: '',
    data: new Date().toISOString().split('T')[0],
    anexos: [] as string[],
  });

  const etapas = [
    {
      titulo: 'Informações Básicas',
      descricao: 'Data e tipo de informação'
    },
    {
      titulo: 'Detalhes',
      descricao: 'Descrição detalhada'
    },
    {
      titulo: 'Anexos',
      descricao: 'Fotos e documentos'
    },
    {
      titulo: 'Revisão',
      descricao: 'Confirmar informações'
    }
  ];

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const validarEtapa = (etapa: number): boolean => {
    switch (etapa) {
      case 0:
        return formData.data.trim() !== '' && formData.descricao.trim() !== '';
      case 1:
        return formData.informacao.trim() !== '';
      case 2:
        return true; 
      case 3:
        return true; 
      default:
        return false;
    }
  };

  const proximaEtapa = () => {
    if (validarEtapa(etapaAtual) && etapaAtual < etapas.length - 1) {
      setEtapaAtual(etapaAtual + 1);
    } else if (!validarEtapa(etapaAtual)) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios antes de continuar.",
        variant: "destructive",
      });
    }
  };

  const etapaAnterior = () => {
    if (etapaAtual > 0) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  const handleSubmit = async () => {
    if (!pessoa || !formData.informacao.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha as informações obrigatórias.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);

      const submissionData: EnvioInformacao = {
        ocoId: pessoa.ultimaOcorrencia.ocoId,
        informacao: formData.informacao,
        descricao: formData.descricao,
        data: formData.data,
      };

      await apiService.enviarInformacoes(submissionData, arquivosEnviados);

      toast({
        title: "Sucesso",
        description: "Suas informações foram enviadas com sucesso. Obrigado por ajudar!",
        variant: "default",
      });

      router.push(`/pessoa/${id}`);
    } catch (error) {
      console.error('Erro ao enviar informações:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar as informações. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enviar Informações</CardTitle>
        <p className="text-muted-foreground text-sm">
          Se você tem informações sobre esta pessoa, preencha o formulário.
          As informações serão enviadas às autoridades.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <IndicadorProgresso
            etapas={etapas.map((etapa, index) => ({
              id: index,
              titulo: etapa.titulo,
              descricao: etapa.descricao,
            }))}
            etapaAtual={etapaAtual}
          />

          <div className="min-h-96">
            <WizardStep isActive={etapaAtual === 0}>
              <EtapaInformacoesBasicas
                formData={formData}
                onChange={updateFormData}
              />
            </WizardStep>

            <WizardStep isActive={etapaAtual === 1}>
              <EtapaDetalhes
                formData={formData}
                onChange={updateFormData}
              />
            </WizardStep>

            <WizardStep isActive={etapaAtual === 2}>
              <EtapaAnexos
                formData={formData}
                onChange={updateFormData}
                arrastando={arrastando}
                arquivosEnviados={arquivosEnviados}
                onDragOver={handleArrastarSobreArea}
                onDragLeave={handleSairDaAreaArrasto}
                onDrop={handleDrop}
                onFileSelect={handleSelecionarArquivos}
                onRemoverArquivo={removerArquivo}
                formatarTamanhoArquivo={formatarTamanhoArquivo}
              />
            </WizardStep>

            <WizardStep isActive={etapaAtual === 3}>
              <EtapaRevisao
                formData={formData}
                pessoa={pessoa}
                arquivosEnviados={arquivosEnviados}
                formatarTamanhoArquivo={formatarTamanhoArquivo}
              />
            </WizardStep>
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/pessoa/${id}`)}
            >
              Cancelar
            </Button>
            
            <div className="flex-1" />
            
            {etapaAtual > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={etapaAnterior}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Anterior
              </Button>
            )}
            
            {etapaAtual < etapas.length - 1 ? (
              <Button
                type="button"
                onClick={proximaEtapa}
                disabled={!validarEtapa(etapaAtual)}
                className="flex items-center gap-2"
              >
                Próximo
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || !validarEtapa(0) || !validarEtapa(1)}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                {submitting ? 'Enviando...' : 'Enviar Informações'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}