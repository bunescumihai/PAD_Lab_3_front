export interface ApiResponse<T>{
  loading: boolean;
  error: any | null;
  object: T | null;
}
