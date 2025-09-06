'use client';

import { useState } from 'react';
import { FiltrosPesquisa as FiltrosPesquisaType } from '@/types/pessoa/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, X } from 'lucide-react';

interface FiltrosPesquisaProps {
  alterarFiltros: (filters: FiltrosPesquisaType) => void;
}

export const FiltrosPesquisa = ({ alterarFiltros }: FiltrosPesquisaProps) => {
  const [filtrosLocais, setFiltrosLocais] = useState<FiltrosPesquisaType>({});
  const [loading, setLoading] = useState(false);

  const handleMudarFiltro = (
    key: keyof FiltrosPesquisaType,
    value: string | number | "MASCULINO" | "FEMININO" | "Desaparecida" | "Localizada"
  ) => {
    const novosFiltros = { ...filtrosLocais, [key]: value };
    setFiltrosLocais(novosFiltros);
  };

  const aplicarFiltros = () => {
    setLoading(true); 
    alterarFiltros(filtrosLocais);
    setLoading(false);
  };

  const limparFiltro = () => {
    const filtrosLimpos = {};
    setFiltrosLocais(filtrosLimpos);
    alterarFiltros(filtrosLimpos);
  };

  const temFiltrosAtivos = Object.values(filtrosLocais).some(value => value !== undefined && value !== '');

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5" />
          Filtros de Busca
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div className="space-y-2 md:col-span-2 lg:col-span-1 xl:col-span-2">
            <label className="text-sm font-medium">Nome</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Digite o nome..."
                value={filtrosLocais.nome || ''}
                onChange={(e) => handleMudarFiltro('nome', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sexo</label>
            <Select
              value={filtrosLocais.sexo || ''}
              onValueChange={(value) => handleMudarFiltro('sexo', value || undefined)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MASCULINO">Masculino</SelectItem>
                <SelectItem value="FEMININO">Feminino</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={filtrosLocais.dataLocalizacao || ''}
              onValueChange={(value) => handleMudarFiltro('dataLocalizacao', value || undefined)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Desaparecida">Desaparecida</SelectItem>
                <SelectItem value="Localizada">Localizada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Faixa Etária</label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Inicial"
                value={filtrosLocais.faixaIdadeInicial || ''}
                onChange={(e) => handleMudarFiltro('faixaIdadeInicial', e.target.value)}
                className="w-full"
              />
              <Input
                type="number"
                placeholder="Final"
                value={filtrosLocais.faixaIdadeFinal || ''}
                onChange={(e) => handleMudarFiltro('faixaIdadeFinal', e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2">
          <Button
            onClick={aplicarFiltros}
            disabled={loading}
            className="flex items-center gap-2 w-full sm:w-auto"
            size="default"
          >
            <Search className="h-4 w-4" />
            {loading ? 'Buscando...' : 'Buscar'}
          </Button>

          {temFiltrosAtivos && (
            <Button
              variant="outline"
              size="default"
              onClick={limparFiltro}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <X className="h-4 w-4" />
              Limpar Filtros
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};