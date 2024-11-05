import { AuthResponse, PaginatedResponse, Product, SortConfig } from './types';

const API_URL = 'https://api.example.com';

export async function login(email: string, password: string): Promise<AuthResponse> {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'fake-jwt-token',
        user: {
          id: '1',
          email,
          name: 'John Doe',
          role: 'admin',
        },
      });
    }, 500);
  });
}

export async function fetchProducts(
  page: number,
  limit: number,
  sort?: SortConfig
): Promise<PaginatedResponse<Product>> {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockProducts: Product[] = Array.from({ length: limit }, (_, i) => ({
        id: `${page * limit + i + 1}`,
        name: `Product ${page * limit + i + 1}`,
        price: Math.floor(Math.random() * 1000),
        category: ['Electronics', 'Clothing', 'Books'][Math.floor(Math.random() * 3)],
        stock: Math.floor(Math.random() * 100),
        createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      }));

      if (sort) {
        mockProducts.sort((a, b) => {
          const aValue = a[sort.column as keyof Product];
          const bValue = b[sort.column as keyof Product];
          return sort.direction === 'asc'
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
        });
      }

      resolve({
        data: mockProducts,
        total: 100,
        page,
        limit,
      });
    }, 500);
  });
}

export async function fetchProductById(id: string): Promise<Product> {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: `Product ${id}`,
        price: Math.floor(Math.random() * 1000),
        category: ['Electronics', 'Clothing', 'Books'][Math.floor(Math.random() * 3)],
        stock: Math.floor(Math.random() * 100),
        createdAt: new Date().toISOString(),
      });
    }, 500);
  });
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product> {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        ...data,
        createdAt: new Date().toISOString(),
      } as Product);
    }, 500);
  });
}