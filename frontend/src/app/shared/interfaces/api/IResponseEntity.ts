export interface IResponseEntity<T> {
    content: T;
    message: string[];
    total?: number;
}