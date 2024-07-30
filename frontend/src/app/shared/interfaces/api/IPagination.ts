export interface IPagination {
    skip: number;
    take: number;
    order?: 'asc' | 'desc';
}