import { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Product, SortConfig } from '@/lib/types';
import { fetchProducts } from '@/lib/api';
import { ArrowUpDown, Plus, Loader2 } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { ViewToggle } from '@/components/ViewToggle';
import { ProductCard } from '@/components/ProductCard';

function ProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState<SortConfig>({ column: 'name', direction: 'asc' });
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const limit = 10;

  useEffect(() => {
    loadProducts();
  }, [page, sort]);

  async function loadProducts() {
    setLoading(true);
    try {
      const response = await fetchProducts(page, limit, sort);
      setProducts(response.data);
      setTotal(response.total);
    } finally {
      setLoading(false);
    }
  }

  function handleSort(column: string) {
    setSort((prev) => ({
      column,
      direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="flex items-center gap-4">
          <ViewToggle view={view} onViewChange={setView} />
          <Button onClick={() => navigate('/products/new')}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : view === 'table' ? (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                  <div className="flex items-center">
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('price')} className="cursor-pointer">
                  <div className="flex items-center">
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('category')} className="cursor-pointer">
                  <div className="flex items-center">
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('stock')} className="cursor-pointer">
                  <div className="flex items-center">
                    Stock
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Suspense fallback={<div>Loading...</div>}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Suspense>
        </div>
      )}

      <div className="flex justify-center gap-2 mt-6">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
        >
          Next
        </Button>
      </div>
    </Layout>
  );
}

export default ProductsPage;