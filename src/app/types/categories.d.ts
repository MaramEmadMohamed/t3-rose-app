export interface Category {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  subCategories: {
    id: string;
    title: string;
  }[];
  _count: {
    products: number;
  };
}

export interface CategoriesResponse {
  status: boolean;
  code: number;
  payload: {
    data: Category[];
    metadata: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}