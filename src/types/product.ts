export type Category = 'accesorios' | 'maquillaje' | 'joyas' | 'otros';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  image: string;
  images?: string[];
  whatsappNumber: string;
  featured?: boolean;
  createdAt?: string;
}
