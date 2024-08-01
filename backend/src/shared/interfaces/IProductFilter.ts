export interface IProductFilter {
    name?: string;
    description?: string;
    categories?: string;
    nostock?: 'false' | 'true';
    seller?: string;
    noseller?: string;
}