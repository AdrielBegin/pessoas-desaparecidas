import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Paperclip, Image } from 'lucide-react';
import { AreaUploadArquivos } from './AreaUploadArquivos';
import { ListaArquivosSelecionados } from './ListaArquivosSelecionados';

interface DadosFormulario {
  data: string;
  descricao: string;
  informacao: string;
  anexos: string[];
}

interface EtapaAnexosProps {
  formData: DadosFormulario;
  onChange: (data: Partial<DadosFormulario>) => void;
  arrastando: boolean;
  arquivosEnviados: File[];
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoverArquivo: (index: number) => void;
  formatarTamanhoArquivo: (size: number) => string;
}

export function EtapaAnexos({
  formData,
  onChange,
  arrastando,
  arquivosEnviados,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  onRemoverArquivo,
  formatarTamanhoArquivo
}: EtapaAnexosProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Paperclip className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Anexos e Evidências</h3>
        <p className="text-muted-foreground">
          Adicione fotos, vídeos ou outros arquivos que possam ajudar na investigação.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Image className="h-4 w-4" />
            Upload de Arquivos
          </h4>
          
          <AreaUploadArquivos
            arrastando={arrastando}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onFileSelect={onFileSelect}
          />
          
          <ListaArquivosSelecionados
            arquivos={arquivosEnviados}
            onRemoverArquivo={onRemoverArquivo}
            formatarTamanhoArquivo={formatarTamanhoArquivo}
          />
        </div>

        <div className="border-t pt-6">
          <div className="space-y-2">
            <Label htmlFor="anexos">URLs de Imagens (Opcional)</Label>
            <Input
              id="anexos"
              placeholder="Cole aqui URLs de imagens que possam ajudar (opcional)"
              onChange={(e) => {
                const urls = e.target.value.split(',').map(url => url.trim()).filter(url => url);
                onChange({ anexos: urls });
              }}
            />
            <p className="text-xs text-muted-foreground">
              Separe múltiplas URLs por vírgula. Ex: https://exemplo.com/foto1.jpg, https://exemplo.com/foto2.jpg
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-2">Tipos de arquivo aceitos:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>Imagens: JPG, PNG, GIF (máx. 10MB cada)</li>              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}