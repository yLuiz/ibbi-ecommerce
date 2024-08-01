import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MESSAGE } from 'src/shared/messages';

const corsOrigins = ["**", "http://localhost:4200", "https://ibbi-ecommerce.vercel.app"];

const options = {
  cors: {
    origin: corsOrigins,
    methods: ["GET"],
    credentials: true,
  }
}

@WebSocketGateway(options)
export class SalesGateway implements OnGatewayConnection, OnGatewayDisconnect {

    private _logger = new Logger();

    handleConnection(socket: Socket) {
        this._logger.log(`[${socket.id}] >>>> Connected <<<<`);
    }
    handleDisconnect(socket: Socket) {
        this._logger.log(`[${socket.id}] >>>> Disconnected <<<<`);
    }
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('new-purchase')
    handleNewPurchase(@MessageBody() purchase: string): void {
        try {
            this.server.emit('new-purchase', {
                purchase: JSON.parse(purchase),
                message: MESSAGE.PURCHASE.NEW_CREATED
            });
        }
        catch (error) {
            this._logger.error(`Error to emit event of new purchase: ${error?.message}`);
            this._logger.error(error);
        }  
    }
}