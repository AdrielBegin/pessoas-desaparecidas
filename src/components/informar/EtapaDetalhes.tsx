import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, AlertCircle } from 'lucide-react';

interface DadosFormulario {
  data: string;
  descricao: string;
  informacao: string;
}

interface EtapaDetalhesProps {
  formData: DadosFormulario;
  onChange: (data: Partial<DadosFormulario>) => void;
}

export function EtapaDetalhes({ formData, onChange }: EtapaDetalhesProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Detalhes da Informação</h3>
        <p className="text-muted-foreground">
          Agora, descreva detalhadamente as informações que você possui.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="informacao">Descrição Detalhada *</Label>
          <Textarea
            id="informacao"
            placeholder="Descreva detalhadamente as informações que você possui sobre esta pessoa. Inclua:\n\n• Local onde foi vista\n• Com quem estava\n• Vestimentas ou características\n• Comportamento observado\n• Qualquer detalhe que possa ser relevante\n\nSeja o mais específico possível."
            value={formData.informacao}
            onChange={(e) => onChange({ informacao: e.target.value })}
            className="min-h-48 resize-none"
            required
          />
          <p className="text-xs text-muted-foreground">
            Informações detalhadas podem ser cruciais para a investigação.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-amber-800 mb-1">Dicas importantes:</p>
              <ul className="text-amber-700 space-y-1 list-disc list-inside">
                <li>Inclua horário aproximado se souber</li>
                <li>Descreva o local com precisão (endereço, pontos de referência)</li>
                <li>Mencione se a pessoa parecia estar bem ou em perigo</li>
                <li>Relate qualquer conversa ou interação que presenciou</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}