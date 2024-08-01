import { HttpErrorResponse } from "@angular/common/http";

export interface IErrorResponse extends HttpErrorResponse {
    error: {
        message: string | string[]
        statusCode: number,
    }
}