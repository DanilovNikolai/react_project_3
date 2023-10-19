export type Pizza = {
  id: string;
  title: string;
  price: number[];
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
  description: string;
  priceId: string[];
};

export type SearchPizzaParams = {
  categoryId: string;
  sortId: string;
  search: string;
  currentPage: string;
  itemsPerPage: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface ItemsSliceState {
  items: Pizza[];
  status?: Status;
}
