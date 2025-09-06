import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/pessoa/api';
import { FiltrosPesquisa } from '@/types/pessoa/api';

export function usePessoas(filtros: FiltrosPesquisa = {}) {
  return useQuery({
    queryKey: ['pessoas', filtros],
    queryFn: () => apiService.getPessoas(filtros),
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

export function useDetalhesPessoa(id: number) {
  return useQuery({
    queryKey: ['pessoa', id],
    queryFn: () => apiService.getDetalhesPessoa(id),
    staleTime: 10 * 60 * 1000, 
    gcTime: 30 * 60 * 1000, 
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!id,
  });
}

export function useEstatisticas() {
  return useQuery({
    queryKey: ['estatisticas'],
    queryFn: () => apiService.getEstatisticas(),
    staleTime: 15 * 60 * 1000, 
    gcTime: 30 * 60 * 1000, 
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

export function usePessoasAleatoriasComFotos(registros: number = 10) {
  return useQuery({
    queryKey: ['pessoas-aleatorias', registros],
    queryFn: () => apiService.getPessoasAleatoriasComFotos(registros),
    staleTime: 2 * 60 * 1000, 
    gcTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false,
    retry: 2,
  });
}