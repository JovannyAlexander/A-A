import { Product } from '@/types/product';
import initialProductsData from '@/data/products.json';

import { WHATSAPP_NUMBER } from './whatsapp'

const STORAGE_KEY = 'tienda_products';

export function getProducts(): Product[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    let products = JSON.parse(stored) as Product[];
    // Migrar número de WhatsApp antiguo al nuevo
    const needsUpdate = products.some(p => p.whatsappNumber === '+573001234567');
    if (needsUpdate) {
      products = products.map(p => ({
        ...p,
        whatsappNumber: p.whatsappNumber === '+573001234567' ? WHATSAPP_NUMBER : p.whatsappNumber,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
    return products;
  }
  
  // Cargar productos iniciales desde JSON
  const products = (initialProductsData as Product[]).map(p => ({
    ...p,
    whatsappNumber: WHATSAPP_NUMBER,
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  return products;
}

export function saveProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function getProductById(id: string): Product | undefined {
  const products = getProducts();
  return products.find(p => p.id === id);
}

export function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0],
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  products[index] = { ...products[index], ...updates };
  saveProducts(products);
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
}
