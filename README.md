# Sistema de Pessoas Desaparecidas - Polícia Civil MT

Sistema web desenvolvido para a Polícia Judiciária Civil de Mato Grosso para consulta e envio de informações sobre pessoas desaparecidas.

## 🚀 Tecnologias

- **Next.js 15** - Framework React para produção
- **TypeScript** - Tipagem estática 
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/UI** - Componentes UI reutilizáveis
- **React Query** - Gerenciamento de estado e cache
- **Lucide React** - Ícones

## 📋 Funcionalidades

- ✅ Listagem de pessoas desaparecidas/localizadas
- ✅ Sistema de busca e filtros avançados
- ✅ Paginação otimizada
- ✅ Página de detalhes completos
- ✅ Formulário para envio de informações
- ✅ Estatísticas em tempo real
- ✅ Design responsivo
- ✅ Integração com API oficial

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

4. Acesse [http://localhost:3000](http://localhost:3000)

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
├── app/                    # App Router (Next.js 13+)
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   ├── not-found.tsx      # Página 404
│   ├── pessoa/[id]/       # Detalhes da pessoa
│   └── informar/[id]/     # Formulário de informações
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (Shadcn)
│   ├── PersonCard.tsx    # Card de pessoa
│   ├── SearchFilters.tsx # Filtros de busca
│   └── ...
├── services/             # Serviços e API
├── types/               # Definições TypeScript
├── lib/                # Utilitários
└── hooks/              # Hooks customizados
```

## 🌐 API

O sistema consome a API oficial da Polícia Civil MT:
- Base URL: `https://abitus-api.geia.vip`
- Documentação: [Swagger UI](https://abitus-api.geia.vip/swagger-ui/index.html)

### Endpoints principais:
- `GET /v1/pessoas/aberto/filtro` - Lista pessoas com filtros
- `GET /v1/pessoas/{id}` - Detalhes de uma pessoa
- `POST /v1/ocorrencias/informacoes-desaparecido` - Enviar informações
- `GET /v1/pessoas/aberto/estatistico` - Estatísticas

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

## 🧪 Testes

```bash
npm run test        # Executar testes
npm run test:watch  # Testes em modo watch
npm run test:coverage # Coverage dos testes
```

## 📈 Performance

- Lazy loading de rotas
- Otimização de imagens
- Code splitting automático
- Cache inteligente com React Query

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

## 📞 Contato

**Polícia Judiciária Civil de Mato Grosso**
- Emergência: 190
- Website: [Portal Oficial](https://www.pc.mt.gov.br)

---

**Desenvolvido para ajudar na localização de pessoas desaparecidas em Mato Grosso.**