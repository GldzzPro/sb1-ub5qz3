export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface SortConfig {
  column: string;
  direction: 'asc' | 'desc';
}

export interface AuthResponse {
  token: string;
  user: User;
}