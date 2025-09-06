import { Card, CardContent } from '@/components/ui/card';

interface SkeletonCardProps {
  count?: number;
}

export function SkeletonCard({ count = 1 }: SkeletonCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="h-48 bg-muted animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-5 bg-muted animate-pulse rounded" />
              <div className="h-6 w-24 bg-muted animate-pulse rounded-full" />
              <div className="space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
              </div>
              <div className="h-9 bg-muted animate-pulse rounded" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export function SkeletonDetalhes() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted h-20 animate-pulse" />
      <div className="container mx-auto px-4 py-8">
        <div className="h-10 w-32 bg-muted animate-pulse rounded mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <div className="w-full aspect-square bg-muted animate-pulse" />
                <div className="absolute top-4 right-4 w-24 h-8 bg-muted animate-pulse rounded" />
              </div>
              <div className="p-6 space-y-4">
                <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-muted animate-pulse rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-muted animate-pulse rounded w-1/3" />
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-10 bg-muted animate-pulse rounded" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonEstatisticas() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded w-32" />
                <div className="h-8 bg-muted animate-pulse rounded w-16" />
              </div>
              <div className="w-12 h-12 bg-muted animate-pulse rounded" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}