import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from 'socket.io';
@WebSocketGateway({port: 3000, namespace: 'clients', cors: true})
export class ClientGateway{
    @SubscribeMessage('clientAdded')
    handleClientAdded(@MessageBody() data: any, @ConnectedSocket() client: Socket){
        client.emit('clientAddedData', data);
        client.broadcast.emit('clientAddedData', data);
    }

    @SubscribeMessage('clientDeleted')
    handleClientDeleted(@MessageBody() data: any, @ConnectedSocket() client: Socket){
        client.emit('clientDeletedData', data);
        client.broadcast.emit('clientDeletedData', data);
    }

    @SubscribeMessage('clientUpdated')
    handleClientUpdated(@MessageBody() data: any, @ConnectedSocket() client: Socket){
        client.emit('clientUpdatedData', data);
        client.broadcast.emit('clientUpdatedData', data);
    }
}