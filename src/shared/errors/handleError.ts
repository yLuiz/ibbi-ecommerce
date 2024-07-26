import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { MESSAGE } from "../messages";

export class HandleError extends HttpException {
    constructor(error: any) {

        const logger = new Logger();

        const status = error?.status || HttpStatus.INTERNAL_SERVER_ERROR
        const message = error?.status ? error.message : MESSAGE.SERVER.INTERNAL_SERVER_ERROR;

        logger.error(`================ [Erro Status]: ${error?.status || '0'} ================`);
        console.error(error);
        logger.error(`================ [FIM LOG] ================`);
        super({
            message: [message],
            statusCode: status
        }, status);

    }
}