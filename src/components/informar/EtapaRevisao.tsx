import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calendar, FileText, Paperclip, AlertTriangle } from 'lucide-react';
import { DetalhesPessoa } from '@/types/pessoa/api';

interface DadosFormulario {
  data: string;
  descricao: string;
  informacao: string;
  anexos: string[];
}

interface EtapaRevisaoProps {
  formData: DadosFormulario;
  pessoa: DetalhesPessoa;
  arquivosEnviados: File[];
  formatarTamanhoArquivo: (size: number) => string;
}

export function EtapaRevisao({ formData, pessoa, arquivosEnviados, formatarTamanhoArquivo }: EtapaRevisaoProps) {
  const formatarData = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Revisão Final</h3>
        <p className="text-muted-foreground">
          Revise todas as informações antes de enviar. Suas informações serão enviadas diretamente às autoridades.
        </p>
      </div>

      <div className="space-y-4">
        {/* Informações sobre a pessoa */}
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Informações sobre
            </h4>
            <div className="flex items-center gap-3">
              {pessoa.urlFoto && (
                <img
                  src={pessoa.urlFoto}
                  alt={pessoa.nome}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-medium">{pessoa.nome}</p>
                <p className="text-sm text-muted-foreground">
                  {pessoa.sexo}, {pessoa.idade} anos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações básicas */}
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Informações Básicas
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data da informação:</span>
                <span className="font-medium">{formatarData(formData.data)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo de informação:</span>
                <Badge variant="secondary">{formData.descricao}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detalhes */}
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Descrição Detalhada
            </h4>
            <div className="bg-muted/50 rounded-md p-3 text-sm">
              <p className="whitespace-pre-wrap">{formData.informacao}</p>
            </div>
          </CardContent>
        </Card>

        {/* Anexos */}
        {(arquivosEnviados.length > 0 || formData.anexos.length > 0) && (
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                Anexos ({arquivosEnviados.length + formData.anexos.length})
              </h4>
              <div className="space-y-2">
                {arquivosEnviados.map((arquivo, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm bg-muted/50 rounded p-2">
                    <Paperclip className="h-3 w-3" />
                    <span className="flex-1">{arquivo.name}</span>
                    <span className="text-muted-foreground">
                      {formatarTamanhoArquivo(arquivo.size)}
                    </span>
                  </div>
                ))}
                {formData.anexos.map((url, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm bg-muted/50 rounded p-2">
                    <Paperclip className="h-3 w-3" />
                    <span className="flex-1 truncate">{url}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Aviso importante */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-amber-800 mb-1">Importante:</p>
              <ul className="text-amber-700 space-y-1">
                <li>• Suas informações serão tratadas com total confidencialidade</li>
                <li>• Os dados serão enviados diretamente às autoridades responsáveis</li>
                <li>• Apenas forneça informações verdadeiras e verificáveis</li>
                <li>• Você pode ser contatado para esclarecimentos adicionais</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}