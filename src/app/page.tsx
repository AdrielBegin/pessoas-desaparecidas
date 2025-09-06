'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiltrosPesquisa as SearchFiltersType } from '@/types/pessoa/api';
import { usePessoas, useEstatisticas } from '@/hooks/usePessoas';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EstatisticasCard } from '@/components/EstatisticasCard';
import { FiltrosPesquisa } from '@/components/FiltrosPesquisa';
import { CartaoPessoa } from '@/components/cartao-pessoa/CartaoPessoa';
import { Paginacao } from '@/components/Paginacao';
import { ErrorState } from '@/components/ErrorState';
import { SkeletonCard, SkeletonEstatisticas } from '@/components/SkeletonCard';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [filtros, setFiltros] = useState<SearchFiltersType>({});
  
  const { 
    data: pessoas, 
    isLoading: loadingPessoas, 
    error: errorPessoas,
    refetch: refetchPessoas 
  } = usePessoas(filtros);
  
  const { 
    data: estatisticas, 
    isLoading: loadingEstatisticas 
  } = useEstatisticas();

  const loading = loadingPessoas || loadingEstatisticas;
  const error = errorPessoas;

  const handleTentarNovamente = () => {
    refetchPessoas();
  };

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFiltros(newFilters);
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
        {loadingEstatisticas && <SkeletonEstatisticas />}
        {!loadingEstatisticas && estatisticas && (
          <EstatisticasCard estatisticas={estatisticas} />
        )}

        <FiltrosPesquisa alterarFiltros={handleFiltersChange} />

        {!loadingPessoas && errorPessoas && (
          <ErrorState
            titulo="Erro ao carregar pessoas"
            mensagem={errorPessoas.message || 'Ocorreu um erro inesperado'}
            tentarNovamente={handleTentarNovamente}
          />
        )}

        {loadingPessoas && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            <SkeletonCard count={8} />
          </div>
        )}

        {!loadingPessoas && pessoas && (
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