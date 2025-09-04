import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, FileText } from 'lucide-react';

interface DadosFormulario {
  data: string;
  descricao: string;
  informacao: string;
}

interface EtapaInformacoesBasicasProps {
  formData: DadosFormulario;
  onChange: (data: Partial<DadosFormulario>) => void;
}

export function EtapaInformacoesBasicas({ formData, onChange }: EtapaInformacoesBasicasProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Informações Básicas</h3>
        <p className="text-muted-foreground">
          Vamos começar com as informações essenciais sobre o que você observou.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="data">Data da Informação *</Label>
          <Input
            id="data"
            type="date"
            value={formData.data}
            onChange={(e) => onChange({ data: e.target.value })}
            max={new Date().toISOString().split('T')[0]}
            required
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Quando você obteve ou observou esta informação?
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricao">Tipo de Informação *</Label>
          <Input
            id="descricao"
            placeholder="Ex: Avistamento, Foto, Informação de terceiros, etc."
            value={formData.descricao}
            onChange={(e) => onChange({ descricao: e.target.value })}
            required
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Breve descrição do tipo de informação que você está fornecendo
          </p>
        </div>
      </div>
    </div>
  );
}