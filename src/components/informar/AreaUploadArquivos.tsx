import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface AreaUploadArquivosProps {
  arrastando: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AreaUploadArquivos({
  arrastando,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect
}: AreaUploadArquivosProps) {
  const referenciaInputArquivo = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-2">
      <Label>Anexar Imagens</Label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          arrastando
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm font-medium mb-1">
          Arraste e solte suas imagens aqui
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          ou clique para selecionar
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => referenciaInputArquivo.current?.click()}
        >
          Selecionar Imagens
        </Button>
        <input
          ref={referenciaInputArquivo}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.gif,.webp,image/*"
          onChange={onFileSelect}
          className="hidden"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Tipos suportados: JPG, PNG, GIF, WebP. Máximo: 10MB por imagem.
      </p>
    </div>
  );
}