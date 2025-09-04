import { useState } from 'react';
import { Pessoa } from '@/types/pessoa/api';
import { Card, CardContent } from '@/components/ui/card';
import { CartaoPessoaResumo } from './CartaoPessoaResumo';
import { CartaoPessoaDetalhes } from './CartaoPessoaDetalhes';


interface CartaoPessoaProps {
  pessoa: Pessoa;
  onClick: (id: number) => void;
}

export const CartaoPessoa = ({ pessoa, onClick }: CartaoPessoaProps) => {
  const [expandido, setExpandido] = useState(false);

  const handleExpandir = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandido(!expandido);
  };

  const handleCardClick = () => {
    if (!expandido) {
      onClick(pessoa.id);
    }
  };

  return (
    <Card 
      className={`transition-all duration-300 ${
        expandido 
          ? 'shadow-xl scale-[1.02]' 
          : 'cursor-pointer hover:shadow-lg hover:-translate-y-1'
      }`}
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <CartaoPessoaResumo 
          pessoa={pessoa} 
          onExpandir={() => void setExpandido(!expandido)}
          expandido={expandido}
        />
        
        <CartaoPessoaDetalhes 
          pessoa={pessoa} 
          expandido={expandido}
        />
      </CardContent>
    </Card>
  );
};