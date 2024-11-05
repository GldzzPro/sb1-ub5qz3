import { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="relative pb-0">
        <div className="aspect-square w-full bg-gray-100 rounded-md overflow-hidden">
          <img
            src={`https://source.unsplash.com/400x400/?product,${product.category}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold">${product.price}</span>
          <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => navigate(`/products/${product.id}/edit`)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}