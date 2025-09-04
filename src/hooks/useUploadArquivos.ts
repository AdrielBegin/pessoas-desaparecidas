import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useUploadArquivos() {
  const { toast } = useToast();
  const [arrastando, setArrastando] = useState(false);
  const [arquivosEnviados, setArquivosEnviados] = useState<File[]>([]);

  const tiposValidos = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp'
  ];

  const processarArquivos = (files: File[]) => {
    const arquivosValidos = files.filter(file => {
      if (!tiposValidos.includes(file.type)) {
        toast({
          title: "Arquivo não suportado",
          description: `${file.name} não é um tipo de arquivo válido. Apenas imagens são aceitas.`,
          variant: "destructive",
        });
        return false;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Imagem muito grande",
          description: `${file.name} é muito grande. Máximo: 10MB.`,
          variant: "destructive",
        });
        return false;
      }

      return true;
    });

    if (arquivosValidos.length > 0) {
      setArquivosEnviados(prev => [...prev, ...arquivosValidos]);
      toast({
        title: "Arquivos adicionados",
        description: `${arquivosValidos.length} arquivo(s) adicionado(s) com sucesso.`,
      });
    }
  };

  const handleArrastarSobreArea = (e: React.DragEvent) => {
    e.preventDefault();
    setArrastando(true);
  };

  const handleSairDaAreaArrasto = (e: React.DragEvent) => {
    e.preventDefault();
    setArrastando(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setArrastando(false);

    const files = Array.from(e.dataTransfer.files);
    processarArquivos(files);
  };

  const handleSelecionarArquivos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processarArquivos(files);
    }
  };

  const removerArquivo = (index: number) => {
    setArquivosEnviados(prev => prev.filter((_, i) => i !== index));
  };

  const formatarTamanhoArquivo = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const unidades = ['Bytes', 'KB', 'MB', 'GB'];
    const indice = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, indice)).toFixed(2)) + ' ' + unidades[indice];
  };

  return {
    arrastando,
    arquivosEnviados,
    handleArrastarSobreArea,
    handleSairDaAreaArrasto,
    handleDrop,
    handleSelecionarArquivos,
    removerArquivo,
    formatarTamanhoArquivo,
    setArquivosEnviados
  };
}