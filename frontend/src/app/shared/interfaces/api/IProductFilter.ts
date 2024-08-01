export interface IProductFilter {
    categories?: string;
    description?: string;
    name?: string;
    noseller?: number;
    seller?: number;
    nostock?: 'false' | 'true';
}