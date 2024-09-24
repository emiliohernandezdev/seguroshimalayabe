import { WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway(80, {namespace: 'providers'})
export class ProviderGateway {
    
}