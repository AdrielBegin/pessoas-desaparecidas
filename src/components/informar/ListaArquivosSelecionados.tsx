import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X, Image } from 'lucide-react';

interface ListaArquivosSelecionadosProps {
  arquivos: File[];
  onRemoverArquivo: (index: number) => void;
  formatarTamanhoArquivo: (bytes: number) => string;
}

export function ListaArquivosSelecionados({
  arquivos,
  onRemoverArquivo,
  formatarTamanhoArquivo
}: ListaArquivosSelecionadosProps) {
  const obterIconeArquivo = (file: File) => {
    return <Image className="h-4 w-4" />;
  };

  if (arquivos.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <Label>Imagens Selecionadas</Label>
      <div className="space-y-2">
        {arquivos.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-muted rounded-lg"
          >
            <div className="flex items-center gap-3">
              {obterIconeArquivo(file)}
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatarTamanhoArquivo(file.size)}
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemoverArquivo(index)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}