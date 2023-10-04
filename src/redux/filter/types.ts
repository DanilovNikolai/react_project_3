export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sortId: number;
  currentPage: number;
  itemsPerPage: number;
}