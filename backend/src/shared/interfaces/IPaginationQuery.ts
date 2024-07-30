export interface IPaginationQuery {
    take: number;
    skip: number;
    order?: 'asc' | 'desc';
}