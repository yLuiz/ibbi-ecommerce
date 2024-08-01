export interface ICategory {
    id: number,
    name: string,
    description: string,
    created_at: Date;
    updated_at: Date;
}

export interface ISalesByCategory {
    sales_quantity: number;
    category_id: number;
    name: string;
    description: string;
}