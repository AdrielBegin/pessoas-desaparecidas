export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  sexo: "MASCULINO" | "FEMININO";
  vivo: boolean;
  urlFoto?: string;
  ultimaOcorrencia: {
    dtDesaparecimento: string;
    dataLocalizacao?: string;
    encontradoVivo: boolean;
    localDesaparecimentoConcat: string;
    ocorrenciaEntrevDesapDTO: {
      informacao?: string;
      vestimentasDesaparecido: string;
    };
    listaCartaz?: string[];
    ocoId: number;
  };
}

export interface RespostaPessoas {
  content: Pessoa[];
  totalPages: number;
  totalElements: number;
  number: number;
  numberOfElements: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
}

export interface Estatisticas {
  quantPessoasDesaparecidas: number;
  quantPessoasEncontradas: number;
}

export interface DetalhesPessoa extends Pessoa {
  observacoes?: string;
}

export interface EnvioInformacao {
  ocoId: number;
  informacao: string;
  descricao: string;
  data: string;    
}

export interface FiltrosPesquisa {
  nome?: string;
  faixaEtaria?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: "MASCULINO" | "FEMININO";
  pagina?: number;
  porPagina?: number;
  dataLocalizacao?: "Desaparecida" | "Localizada";
}
