# Lógica de Status de Pessoas Desaparecidas

## Visão Geral

Este documento explica como implementar e usar a lógica para determinar o status de pessoas desaparecidas baseado nos dados da API.

## Como Funciona

### Campo Chave: `dataLocalizacao`

O status de uma pessoa é determinado pelo campo `dataLocalizacao` dentro de `ultimaOcorrencia`:

- **`dataLocalizacao: null`** → Pessoa **Desaparecida**
- **`dataLocalizacao: "2025-03-21T20:34:06.069"`** → Pessoa **Localizada**

### Estrutura dos Dados

```typescript
interface Pessoa {
  id: number;
  nome: string;
  // ... outros campos
  ultimaOcorrencia: {
    dtDesaparecimento: string;
    dataLocalizacao?: string; // ← Campo chave para status
    encontradoVivo: boolean;
    // ... outros campos
  };
}
```

## Implementação

### 1. Funções Utilitárias (`/src/utils/statusPessoa.ts`)

```typescript
import { obterStatusPessoa, estaDesaparecida, foiLocalizada } from '@/utils/statusPessoa';

// Obter status da pessoa
const status = obterStatusPessoa(pessoa); // 'Desaparecida' | 'Localizada'

// Verificações booleanas
const desaparecida = estaDesaparecida(pessoa); // true/false
const localizada = foiLocalizada(pessoa); // true/false

// Filtrar array de pessoas
const pessoasDesaparecidas = filtrarPorStatus(pessoas, 'Desaparecida');
const pessoasLocalizadas = filtrarPorStatus(pessoas, 'Localizada');
```

### 2. Componente de Status (`/src/components/StatusBadge.tsx`)

```tsx
import { StatusBadge } from '@/components/StatusBadge';

// Uso básico
<StatusBadge pessoa={pessoa} />

// Com data de localização
<StatusBadge pessoa={pessoa} showDate={true} />
```

### 3. Filtros de Pesquisa

O componente `FiltrosPesquisa` já está configurado para usar o campo `dataLocalizacao` com os valores:
- `"Desaparecida"`
- `"Localizada"`

### 4. API Service

O serviço da API implementa duas estratégias:

1. **Filtro na API** (se suportado):
   ```
   GET /v1/pessoas/aberto/filtro?localizada=true  // Pessoas localizadas
   GET /v1/pessoas/aberto/filtro?localizada=false // Pessoas desaparecidas
   ```

2. **Filtro Local** (fallback):
   Se a API não suportar o parâmetro `localizada`, a filtragem é feita localmente após receber os dados.

## Exemplos de Uso

### Exemplo 1: Exibir Status em Lista

```tsx
function ListaPessoas({ pessoas }: { pessoas: Pessoa[] }) {
  return (
    <div>
      {pessoas.map(pessoa => (
        <div key={pessoa.id} className="flex justify-between items-center p-4 border-b">
          <div>
            <h3>{pessoa.nome}</h3>
            <p>Idade: {pessoa.idade}</p>
          </div>
          <StatusBadge pessoa={pessoa} showDate={true} />
        </div>
      ))}
    </div>
  );
}
```

### Exemplo 2: Estatísticas

```tsx
function EstatisticasStatus({ pessoas }: { pessoas: Pessoa[] }) {
  const desaparecidas = pessoas.filter(estaDesaparecida).length;
  const localizadas = pessoas.filter(foiLocalizada).length;
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-red-50 p-4 rounded">
        <h3>Desaparecidas</h3>
        <p className="text-2xl font-bold text-red-600">{desaparecidas}</p>
      </div>
      <div className="bg-green-50 p-4 rounded">
        <h3>Localizadas</h3>
        <p className="text-2xl font-bold text-green-600">{localizadas}</p>
      </div>
    </div>
  );
}
```

### Exemplo 3: Filtro Personalizado

```tsx
function FiltroCustomizado() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<'todos' | 'desaparecidas' | 'localizadas'>('todos');
  
  const pessoasFiltradas = useMemo(() => {
    switch (filtroStatus) {
      case 'desaparecidas':
        return filtrarPorStatus(pessoas, 'Desaparecida');
      case 'localizadas':
        return filtrarPorStatus(pessoas, 'Localizada');
      default:
        return pessoas;
    }
  }, [pessoas, filtroStatus]);
  
  return (
    <div>
      <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
        <option value="todos">Todas</option>
        <option value="desaparecidas">Desaparecidas</option>
        <option value="localizadas">Localizadas</option>
      </select>
      
      {pessoasFiltradas.map(pessoa => (
        <div key={pessoa.id}>
          {pessoa.nome} - <StatusBadge pessoa={pessoa} />
        </div>
      ))}
    </div>
  );
}
```

## Considerações Importantes

1. **Performance**: Para grandes volumes de dados, prefira filtrar na API quando possível.

2. **Consistência**: Sempre use as funções utilitárias para determinar status, não implemente a lógica diretamente nos componentes.

3. **Tratamento de Erros**: As funções utilitárias são seguras e tratam casos onde `dataLocalizacao` pode ser `undefined`.

4. **Formatação de Datas**: Use `formatarDataLocalizacao()` para exibir datas de forma consistente.

5. **Acessibilidade**: O componente `StatusBadge` inclui ícones para melhor acessibilidade visual.

## Arquivos Relacionados

- `/src/utils/statusPessoa.ts` - Funções utilitárias
- `/src/components/StatusBadge.tsx` - Componente de status
- `/src/components/FiltrosPesquisa.tsx` - Filtros de pesquisa
- `/src/services/pessoa/api.ts` - Serviço da API
- `/src/types/pessoa/api.ts` - Tipos TypeScript