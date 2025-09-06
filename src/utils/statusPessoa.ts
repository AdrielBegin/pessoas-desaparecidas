import { Pessoa } from '@/types/pessoa/api';

export type StatusPessoa = 'Desaparecida' | 'Localizada';

/**
 * Determina o status de uma pessoa baseado na data de localização
 * @param pessoa - Objeto da pessoa
 * @returns 'Localizada' se dataLocalizacao existe, 'Desaparecida' caso contrário
 */
export function obterStatusPessoa(pessoa: Pessoa): StatusPessoa {
  return pessoa.ultimaOcorrencia.dataLocalizacao ? 'Localizada' : 'Desaparecida';
}

/**
 * Verifica se uma pessoa está desaparecida
 * @param pessoa - Objeto da pessoa
 * @returns true se a pessoa está desaparecida
 */
export function estaDesaparecida(pessoa: Pessoa): boolean {
  return !pessoa.ultimaOcorrencia.dataLocalizacao;
}

/**
 * Verifica se uma pessoa foi localizada
 * @param pessoa - Objeto da pessoa
 * @returns true se a pessoa foi localizada
 */
export function foiLocalizada(pessoa: Pessoa): boolean {
  return !!pessoa.ultimaOcorrencia.dataLocalizacao;
}

/**
 * Filtra pessoas por status
 * @param pessoas - Array de pessoas
 * @param status - Status desejado
 * @returns Array filtrado de pessoas
 */
export function filtrarPorStatus(pessoas: Pessoa[], status: StatusPessoa): Pessoa[] {
  return pessoas.filter(pessoa => obterStatusPessoa(pessoa) === status);
}

/**
 * Formata a data de localização para exibição
 * @param dataLocalizacao - String da data de localização
 * @returns Data formatada ou null se não existe
 */
export function formatarDataLocalizacao(dataLocalizacao?: string): string | null {
  if (!dataLocalizacao) return null;
  
  try {
    const data = new Date(dataLocalizacao);
    return data.toLocaleDateString('pt-BR');
  } catch {
    return dataLocalizacao;
  }
}