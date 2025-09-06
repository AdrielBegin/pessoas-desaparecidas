# Sistema de Pessoas Desaparecidas - Polícia Civil MT

Sistema web desenvolvido para a Polícia Judiciária Civil de Mato Grosso para consulta e envio de informações sobre pessoas desaparecidas. O sistema permite visualizar, filtrar e obter informações detalhadas sobre casos de pessoas desaparecidas e localizadas.

## 🚀 Tecnologias

- **Next.js 15** - Framework React para produção com App Router
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Framework CSS utilitário para estilização
- **Shadcn/UI** - Sistema de componentes UI moderno e acessível
- **TanStack React Query** - Gerenciamento de estado servidor e cache
- **Lucide React** - Biblioteca de ícones SVG
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas TypeScript

## 📋 Funcionalidades

### 🔍 **Consulta e Visualização**
- ✅ Listagem de pessoas desaparecidas e localizadas
- ✅ Sistema de busca por nome, idade, sexo e localização
- ✅ Filtros avançados por status (desaparecida/localizada)
- ✅ Paginação otimizada para grandes volumes de dados
- ✅ Página de detalhes completos com fotos e informações
- ✅ Badges de status visuais com indicadores de data

### 📊 **Estatísticas e Relatórios**
- ✅ Dashboard com estatísticas em tempo real
- ✅ Contadores de pessoas desaparecidas vs. localizadas
- ✅ Gráficos e métricas de acompanhamento

### 📝 **Interação e Informações**
- ✅ Formulário para envio de informações sobre desaparecidos
- ✅ Upload de arquivos e documentos
- ✅ Sistema de notificações e feedback

### 🎨 **Interface e Experiência**
- ✅ Design responsivo e mobile-first
- ✅ Interface acessível e intuitiva
- ✅ Tema profissional adequado ao contexto governamental
- ✅ Componentes reutilizáveis e consistentes

## 🛠 Instalação

1. Clone o repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd sistema-pessoas-desaparecidas
```

2. Instale as dependências
```bash
npm install
```

3. Execute o projeto em modo desenvolvimento
```bash
npm run dev
```

4. Acesse [http://localhost:3000](http://localhost:3000) ou a porta disponível exibida no terminal

## 📝 Scripts Disponíveis

```bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Gera build de produção
npm run start    # Executa versão de produção
npm run lint     # Executa linter
```

## 🐳 Docker

```bash
# Build da imagem
docker build -t pessoas-desaparecidas .

# Executar container
docker run -p 3000:3000 pessoas-desaparecidas
```

## 📁 Estrutura do Projeto

```
src/
├── app/                      # App Router (Next.js 15)
│   ├── globals.css          # Estilos globais Tailwind
│   ├── layout.tsx           # Layout principal com providers
│   ├── page.tsx             # Página inicial - listagem
│   ├── not-found.tsx        # Página 404 customizada
│   ├── metadata.ts          # Metadados SEO
│   ├── pessoa/[id]/         # Detalhes da pessoa
│   └── informar/[id]/       # Formulário de informações
├── components/              # Componentes reutilizáveis
│   ├── ui/                  # Componentes base (Shadcn/UI)
│   ├── cartao-pessoa/       # Componentes do card de pessoa
│   ├── detalhes-pessoa/     # Componentes de detalhes
│   ├── informar/            # Componentes do formulário
│   ├── FiltrosPesquisa.tsx  # Sistema de filtros
│   ├── StatusBadge.tsx      # Badge de status da pessoa
│   ├── EstatisticasCard.tsx # Cards de estatísticas
│   ├── Paginacao.tsx        # Componente de paginação
│   └── ExemploUsoStatus.tsx # Exemplo da lógica de status
├── services/                # Serviços e integração API
│   └── pessoa/              # Serviços relacionados a pessoas
├── types/                   # Definições TypeScript
│   └── pessoa/              # Tipos relacionados a pessoas
├── utils/                   # Funções utilitárias
│   └── statusPessoa.ts      # Lógica de status das pessoas
├── providers/               # Providers React
│   └── ReactQueryProvider.tsx
├── hooks/                   # Hooks customizados
├── lib/                     # Configurações e utilitários
└── docs/                    # Documentação técnica
    └── logica-status-pessoas.md
```

## 🌐 API e Integração

O sistema consome a API oficial da Polícia Civil MT:
- **Base URL**: `https://abitus-api.geia.vip`
- **Documentação**: [Swagger UI](https://abitus-api.geia.vip/swagger-ui/index.html)
- **Proxy**: Configurado via Next.js para `/api/*`

### Endpoints principais:
- `GET /v1/pessoas/aberto/filtro` - Lista pessoas com filtros e paginação
- `GET /v1/pessoas/{id}` - Detalhes completos de uma pessoa
- `POST /v1/ocorrencias/informacoes-desaparecido` - Enviar informações
- `GET /v1/pessoas/aberto/estatistico` - Estatísticas gerais

### Lógica de Status
O sistema implementa uma lógica inteligente para determinar o status das pessoas:
- **Desaparecida**: `ultimaOcorrencia.dataLocalizacao === null`
- **Localizada**: `ultimaOcorrencia.dataLocalizacao !== null`

Veja mais detalhes na [documentação técnica](./docs/logica-status-pessoas.md).

## 🎨 Design System

O projeto utiliza um design system profissional adequado ao contexto governamental:

- **Cores**: Azuis profissionais, cinzas e brancos
- **Tipografia**: Inter (Google Fonts)
- **Componentes**: Sistema baseado em Shadcn/UI
- **Responsividade**: Mobile-first

## 🔒 Segurança

- Tratamento de erros robusto
- Validação de dados no frontend
- Headers de segurança configurados
- Rate limiting considerado

## 📱 Responsividade

- Design mobile-first
- Breakpoints otimizados
- Componentes adaptativos
- Touch-friendly

## 🔧 Configuração TypeScript

O projeto utiliza configuração modular do TypeScript:
- `tsconfig.json` - Configuração principal
- `tsconfig.app.json` - Configuração da aplicação Next.js
- `tsconfig.node.json` - Configuração para ferramentas Node.js

## 🧪 Qualidade de Código

```bash
npm run lint        # ESLint para análise de código
npm run build       # Verificação de build TypeScript
```

## 📈 Performance e Otimizações

- **Lazy loading** de rotas e componentes
- **Otimização de imagens** com Next.js Image
- **Code splitting** automático por rotas
- **Cache inteligente** com TanStack React Query
- **Server-side rendering** para SEO
- **Paginação eficiente** para grandes datasets
- **Debounce** em campos de busca
- **Memoização** de componentes pesados

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

## 🚀 Deploy e Produção

### Build de Produção
```bash
npm run build
npm run start
```

### Docker
```bash
docker build -t pessoas-desaparecidas .
docker run -p 3000:3000 pessoas-desaparecidas
```

## 📚 Documentação Técnica

- [Lógica de Status das Pessoas](./docs/logica-status-pessoas.md)
- [Componente StatusBadge](./src/components/StatusBadge.tsx)
- [Funções Utilitárias](./src/utils/statusPessoa.ts)

## 📞 Contato

**Polícia Judiciária Civil de Mato Grosso**
- **Emergência**: 190
- **Website**: [Portal Oficial](https://www.pc.mt.gov.br)
- **API**: [Documentação Swagger](https://abitus-api.geia.vip/swagger-ui/index.html)

