import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from 'socket.io';
@WebSocketGateway({port: 3000, namespace: 'auth', cors: true})
export class AuthGateway{
    @SubscribeMessage('roleUpdated')
    handleRolUpdated(@MessageBody() data: any, @ConnectedSocket() client: Socket){
        client.emit('roleUpdatedData', data);
        client.broadcast.emit('roleUpdatedData', data);
    }
}