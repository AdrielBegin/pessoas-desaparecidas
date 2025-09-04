import { RespostaPessoas, Estatisticas, DetalhesPessoa, EnvioInformacao, FiltrosPesquisa, Pessoa } from '@/types/pessoa/api';

const API_BASE_URL = 'https://abitus-api.geia.vip';

interface ApiError {
  status: number;
  message: string;
  details?: unknown;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const headers: Record<string, string> = {};

      if (!(options?.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          ...headers,
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        let errorDetails;
        try {
          errorDetails = await response.text();
        } catch {
          errorDetails = 'Não foi possível obter detalhes do erro';
        }

        const error: ApiError = {
          status: response.status,
          message: this.getErrorMessage(response.status),
          details: errorDetails
        };

        console.error('Erro na API:', {
          endpoint,
          status: response.status,
          statusText: response.statusText,
          details: errorDetails
        });

        throw error;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('Erro de conexão com a API:', endpoint);
        throw new Error('Falha na conexão com o servidor. Verifique sua internet.');
      }

      console.error('Falha na requisição da API:', error);
      throw error;
    }
  }

  private getErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return 'Requisição inválida. Verifique os parâmetros enviados.';
      case 401:
        return 'Não autorizado. Verifique suas credenciais.';
      case 403:
        return 'Acesso negado.';
      case 404:
        return 'Recurso não encontrado.';
      case 500:
        return 'Erro interno do servidor. Tente novamente em alguns minutos.';
      case 502:
        return 'Servidor indisponível. Tente novamente mais tarde.';
      case 503:
        return 'Serviço temporariamente indisponível.';
      default:
        return `Erro ${status}: Algo deu errado.`;
    }
  }

  private async requestWithRetry<T>(
    endpoint: string, 
    options?: RequestInit, 
    maxRetries: number = 2
  ): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.request<T>(endpoint, options);
      } catch (error: unknown) {
        lastError = error;
        
        if (error && typeof error === 'object' && 'status' in error && 
            (error as { status: number }).status === 500 && attempt < maxRetries) {
          console.log(`Tentativa ${attempt} falhou, tentando novamente em 2s...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }
                
        throw error;
      }
    }

    throw lastError;
  }

  async getPessoas(filters: FiltrosPesquisa = {}): Promise<RespostaPessoas> {
    const params = new URLSearchParams();

    if (filters.nome) params.append('nome', filters.nome);
    if (filters.faixaIdadeInicial !== undefined) {
      params.append('faixaIdadeInicial', filters.faixaIdadeInicial.toString());
    }
    if (filters.faixaIdadeFinal !== undefined) {
      params.append('faixaIdadeFinal', filters.faixaIdadeFinal.toString());
    }
    if (filters.sexo) params.append('sexo', filters.sexo);
    if (filters.pagina !== undefined) params.append('pagina', filters.pagina.toString());
    if (filters.porPagina !== undefined) params.append('porPagina', filters.porPagina.toString());
    if (filters.dataLocalizacao) params.append('dataLocalizacao', filters.dataLocalizacao.toString());

    const queryString = params.toString();
    const endpoint = `/v1/pessoas/aberto/filtro${queryString ? `?${queryString}` : ''}`;

    return this.requestWithRetry<RespostaPessoas>(endpoint);
  }

  async getDetalhesPessoa(id: number): Promise<DetalhesPessoa> {
    return this.request<DetalhesPessoa>(`/v1/pessoas/${id}`);
  }

  async getEstatisticas(): Promise<Estatisticas> {
    return this.requestWithRetry<Estatisticas>('/v1/pessoas/aberto/estatistico');
  }

  async getPessoasAleatoriasComFotos(registros: number = 10): Promise<DetalhesPessoa[]> {
    return this.request<DetalhesPessoa[]>(`/v1/pessoas/dinamico?registros=${registros}`);
  }

  async enviarInformacoes(data: EnvioInformacao, files?: File[]): Promise<void> {
    const formData = new FormData();

    formData.append('ocoId', data.ocoId.toString());
    formData.append('informacao', data.informacao);
    formData.append('descricao', data.descricao);
    formData.append('data', data.data);
    
    if (files && files.length > 0) {
      files.forEach((file, index) => {
        formData.append('files', file);
      });
    }

    return this.request<void>('/v1/ocorrencias/informacoes-desaparecido', {
      method: 'POST',
      body: formData, 
    });
  }

  async verificarDuplicidade(data: {
    nome: string;
    mae: string;
    cpf: string;
    dataNascimento: string;
    dataDesaparecimento: string;
  }): Promise<Pessoa[]> {
    return this.request<Pessoa[]>('/v1/ocorrencias/delegacia-digital/verificar-duplicidade', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();