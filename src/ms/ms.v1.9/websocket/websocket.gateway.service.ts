import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8080, { namespace: 'fastdata' })
export class WebSocketsGatewayService {
  @WebSocketServer()
  server: Server;

  sendMessageToAll(events: string[], message: string): void {
    events.forEach((event) => {
      this.server.emit(event, message);
    });
  }
}
