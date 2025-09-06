'use client';

import { useState, useEffect } from 'react';
import { Pessoa } from '@/types/pessoa/api';
import { obterStatusPessoa, estaDesaparecida, foiLocalizada, filtrarPorStatus } from '@/utils/statusPessoa';
import { StatusBadge } from '@/components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, UserCheck, UserX } from 'lucide-react';

// Exemplo de dados mockados baseados no JSON fornecido
const exemplosPessoas: Pessoa[] = [
  {
    id: 2335,
    nome: "João da Silva",
    idade: 35,
    sexo: "MASCULINO",
    vivo: true,
    urlFoto: "https://example.com/foto1.jpg",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-03-21T20:34:06.069",
      dataLocalizacao: null, // Pessoa DESAPARECIDA
      encontradoVivo: true,
      localDesaparecimentoConcat: "Jardim das Acácias - Brasiléia/SP",
      ocorrenciaEntrevDesapDTO: {
        informacao: "A pessoa foi vista pela última vez em frente à sua casa.",
        vestimentasDesaparecido: "Camisa branca e jeans"
      },
      listaCartaz: null,
      ocoId: 1517
    }
  },
  {
    id: 2336,
    nome: "Maria Santos",
    idade: 28,
    sexo: "FEMININO",
    vivo: true,
    urlFoto: "https://example.com/foto2.jpg",
    ultimaOcorrencia: {
      dtDesaparecimento: "2025-02-15T10:20:30.000",
      dataLocalizacao: "2025-03-20T14:30:00.000", // Pessoa LOCALIZADA
      encontradoVivo: true,
      localDesaparecimentoConcat: "Centro - São Paulo/SP",
      ocorrenciaEntrevDesapDTO: {
        informacao: "Saiu para trabalhar e não retornou.",
        vestimentasDesaparecido: "Blusa azul e saia preta"
      },
      listaCartaz: null,
      ocoId: 1518
    }
  }
];

export const ExemploUsoStatus = () => {
  const [pessoas] = useState<Pessoa[]>(exemplosPessoas);
  const [filtroAtivo, setFiltroAtivo] = useState<'todos' | 'desaparecidas' | 'localizadas'>('todos');

  // Estatísticas
  const totalPessoas = pessoas.length;
  const pessoasDesaparecidas = pessoas.filter(estaDesaparecida).length;
  const pessoasLocalizadas = pessoas.filter(foiLocalizada).length;

  // Filtragem
  const pessoasFiltradas = (() => {
    switch (filtroAtivo) {
      case 'desaparecidas':
        return filtrarPorStatus(pessoas, 'Desaparecida');
      case 'localizadas':
        return filtrarPorStatus(pessoas, 'Localizada');
      default:
        return pessoas;
    }
  })();

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Exemplo de Uso - Lógica de Status</h1>
        <p className="text-muted-foreground">
          Demonstração prática de como determinar e filtrar pessoas por status
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pessoas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPessoas}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desaparecidas</CardTitle>
            <UserX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{pessoasDesaparecidas}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Localizadas</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{pessoasLocalizadas}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros por Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant={filtroAtivo === 'todos' ? 'default' : 'outline'}
              onClick={() => setFiltroAtivo('todos')}
            >
              Todas ({totalPessoas})
            </Button>
            <Button
              variant={filtroAtivo === 'desaparecidas' ? 'default' : 'outline'}
              onClick={() => setFiltroAtivo('desaparecidas')}
            >
              Desaparecidas ({pessoasDesaparecidas})
            </Button>
            <Button
              variant={filtroAtivo === 'localizadas' ? 'default' : 'outline'}
              onClick={() => setFiltroAtivo('localizadas')}
            >
              Localizadas ({pessoasLocalizadas})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pessoas */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pessoas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pessoasFiltradas.map(pessoa => {
              const status = obterStatusPessoa(pessoa);
              
              return (
                <div key={pessoa.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-medium">{pessoa.nome}</h3>
                    <p className="text-sm text-muted-foreground">
                      {pessoa.idade} anos • {pessoa.sexo === 'MASCULINO' ? 'Masculino' : 'Feminino'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}
                    </p>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <StatusBadge pessoa={pessoa} showDate={true} />
                    
                    {/* Demonstração das funções utilitárias */}
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>obterStatusPessoa(): {status}</div>
                      <div>estaDesaparecida(): {estaDesaparecida(pessoa) ? 'true' : 'false'}</div>
                      <div>foiLocalizada(): {foiLocalizada(pessoa) ? 'true' : 'false'}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {pessoasFiltradas.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma pessoa encontrada com o filtro selecionado.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Explicação da Lógica */}
      <Card>
        <CardHeader>
          <CardTitle>Como Funciona a Lógica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Campo Chave: dataLocalizacao</h4>
            <ul className="text-sm space-y-1">
              <li>• <code>dataLocalizacao: null</code> → Pessoa <Badge variant="destructive">Desaparecida</Badge></li>
              <li>• <code>dataLocalizacao: "2025-03-20T14:30:00.000"</code> → Pessoa <Badge variant="default" className="bg-green-100 text-green-800">Localizada</Badge></li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Funções Utilitárias Disponíveis</h4>
            <ul className="text-sm space-y-1">
              <li>• <code>obterStatusPessoa(pessoa)</code> - Retorna 'Desaparecida' ou 'Localizada'</li>
              <li>• <code>estaDesaparecida(pessoa)</code> - Retorna true/false</li>
              <li>• <code>foiLocalizada(pessoa)</code> - Retorna true/false</li>
              <li>• <code>filtrarPorStatus(pessoas, status)</code> - Filtra array por status</li>
              <li>• <code>formatarDataLocalizacao(data)</code> - Formata data para exibição</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};