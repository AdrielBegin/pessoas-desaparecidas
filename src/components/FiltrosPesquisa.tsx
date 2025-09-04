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
  loading?: boolean;
}

export const FiltrosPesquisa = ({ alterarFiltros, loading }: FiltrosPesquisaProps) => {
  const [filtros, setFiltros] = useState<FiltrosPesquisaType>({});

  const handleMudarFiltro = (
    key: keyof FiltrosPesquisaType,
    value: string | number | "MASCULINO" | "FEMININO" | "Desaparecida" | "Localizada"
  ) => {
    const novosFiltros = { ...filtros, [key]: value };
    setFiltros(novosFiltros);
    alterarFiltros(novosFiltros);
  };

  const limparFiltro = () => {
    const filtrosLimpos = {};
    setFiltros(filtrosLimpos);
    alterarFiltros(filtrosLimpos);
  };

  const temFiltrosAtivos = Object.values(filtros).some(value => value !== undefined && value !== '');

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5" />
          Filtros de Busca
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Digite o nome..."
                value={filtros.nome || ''}
                onChange={(e) => handleMudarFiltro('nome', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sexo</label>
            <Select
              value={filtros.sexo || ''}
              onValueChange={(value) => handleMudarFiltro('sexo', value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o sexo" />
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
              value={filtros.dataLocalizacao || ''}
              onValueChange={(value) => handleMudarFiltro('dataLocalizacao', value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Desaparecida">Desaparecida</SelectItem>
                <SelectItem value="Localizada">Localizada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Faixa Etária Inicial</label>
            <Input
              placeholder="Ex: 1"
              value={filtros.faixaIdadeInicial || ''}
              onChange={(e) => handleMudarFiltro('faixaIdadeInicial', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Faixa Etária Final</label>
            <Input
              placeholder="Ex: 10"
              value={filtros.faixaIdadeFinal || ''}
              onChange={(e) => handleMudarFiltro('faixaIdadeFinal', e.target.value)}
            />
          </div>
        </div>

        {temFiltrosAtivos && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={limparFiltro}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Limpar Filtros
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};