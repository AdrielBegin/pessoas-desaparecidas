'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RespostaPessoas, FiltrosPesquisa as SearchFiltersType, Estatisticas } from '@/types/pessoa/api';
import { apiService } from '@/services/pessoa/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EstatisticasCard } from '@/components/EstatisticasCard';
import { FiltrosPesquisa } from '@/components/FiltrosPesquisa';
import { CartaoPessoa } from '@/components/cartao-pessoa/CartaoPessoa';
import { Paginacao } from '@/components/Paginacao';
import { ErrorState } from '@/components/ErrorState';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [pessoas, setPessoas] = useState<RespostaPessoas | null>(null);
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filtros, setFiltros] = useState<SearchFiltersType>({
    pagina: 0,
    porPagina: 10
  });

  useEffect(() => {
    fetchData();
  }, [filtros]);

  useEffect(() => {
    fetchEstatisticas();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getPessoas(filtros);
      setPessoas(data);
    } catch (error) {
      setError(true);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados das pessoas desaparecidas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEstatisticas = async () => {
    try {
      const data = await apiService.getEstatisticas();
      setEstatisticas(data);
    } catch (error) {
      setError(true);
      setLoading(false);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados estatísticos de pessoas desaparecidas.",
        variant: "destructive",
      });
    }
  };

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFiltros({ ...newFilters, pagina: 0, porPagina: 10 });
  };

  const handlePageChange = (page: number) => {
    setFiltros({ ...filtros, pagina: page - 1 });
  };

  const handlePessoaClick = (id: number) => {
    router.push(`/pessoa/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">

      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">            
            <Image
              src="/Brasao_PJCMT.ico"
              alt="Logo"
              width={80}
              height={80}              
            />
            <div>
              <h1 className="text-3xl font-bold">Pessoas Desaparecidas</h1>
              <p className="text-primary-foreground/80">
                Polícia Judiciária Civil - Estado de Mato Grosso
              </p>
            </div>
          </div>
          <p className="text-xs text-primary-foreground/90 max-w-2xl">
            Esta plataforma disponibiliza informações sobre pessoas desaparecidas no estado de Mato Grosso.
            Se você possui informações que possam ajudar na localização de alguém, entre em contato.
          </p>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {estatisticas && <EstatisticasCard estatisticas={estatisticas} />}

        <FiltrosPesquisa alterarFiltros={handleFiltersChange} loading={loading} />

        {!loading && error && (
          <ErrorState
            titulo="Erro ao carregar dados"
            mensagem="Não foi possível carregar as informações. Tente novamente."
            tentarNovamente={fetchData}
            mostrarRepetir={true}
          />
        )}

        {loading && (
          <Card className="p-8">
            <CardContent className="flex items-center justify-center">
              <div className="flex items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Carregando informações...</span>
              </div>
            </CardContent>
          </Card>
        )}

        {!loading && pessoas && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  Mostrando {pessoas.numberOfElements} de {pessoas.totalElements} registros
                  {pessoas.totalPages > 1 && (
                    <span> - Página {pessoas.number + 1} de {pessoas.totalPages}</span>
                  )}
                </span>
              </div>
            </div>

            {pessoas?.content?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {pessoas.content.map((pessoa) => (
                  <CartaoPessoa
                    key={pessoa.id}
                    pessoa={pessoa}
                    onClick={handlePessoaClick}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-8">
                <CardContent className="text-center">
                  <AlertTriangle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Nenhum resultado encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    Não foram encontradas pessoas com os filtros aplicados.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => handleFiltersChange({})}
                  >
                    Limpar Filtros
                  </Button>
                </CardContent>
              </Card>
            )}

            {pessoas.totalPages > 1 && (
              <Paginacao
                paginaAtual={pessoas.number + 1}
                totalPaginas={pessoas.totalPages}
                alterarPagina={handlePageChange}
                className="mt-8"
              />
            )}
          </>
        )}
      </main>

      <footer className="bg-muted mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">
              © 2025 Polícia Judiciária Civil de Mato Grosso
            </p>
            <p className="text-sm">
              Em caso de emergência, ligue 190. Para informações sobre pessoas desaparecidas,
              entre em contato com a delegacia mais próxima.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}