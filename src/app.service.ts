import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'

@Injectable()
export class AppService implements OnModuleInit {
    private client: ClientProxy;
    private readonly queueName = 'cats_queue';

    onModuleInit() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'cats_queue',
                queueOptions: {
                    durable: false
                },
            },
        });
      }

    async publishCreateCat(data: any) {
        const result = this.client.emit('create_cat', data);
        if (result) {
            return { status: `Mensagem [${JSON.stringify(data)}] enviada para a fila [${this.queueName}]` };
        }
    }
}
