import { HttpException, HttpStatus } from "@nestjs/common";
import { MESSAGE } from "../messages";

export class HandleError extends HttpException {
    constructor(error: any) {

        const status = error?.status || HttpStatus.INTERNAL_SERVER_ERROR
        const message = error?.status ? error.message : MESSAGE.SERVER.INTERNAL_SERVER_ERROR;

        console.error(`[Erro Status]: ${error?.status || '0'} - ${error}`);
        super(message, status);

    }
}