import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Consumer, ConsumerRunConfig, ITopicConfig, Kafka } from 'kafkajs';
import { WebSocketsGatewayService } from '../../websocket/websocket.gateway.service';
import { MsTaskListEnum } from '../_domain/MsTaskTypes';
import { IEventDrivenRequest } from '../_domain/IEventDrivenRequest';
import { assign } from 'lodash';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnApplicationShutdown {
  //
  private kafka: Kafka;
  private readonly consumers: Consumer[] = [];
  constructor(private readonly webSocketsGatewayService: WebSocketsGatewayService) {}

  //
  async onModuleInit() {
    //
    this.kafka = new Kafka({
      clientId: 'MsConsumerClient',

      brokers: process.env.KAFKA_BROKERS.split(','),
    });

    //
    const admin = this.kafka.admin();
    const topicsInKafka = await admin.listTopics();
    MsTaskListEnum.forEach(async (typeTask: string) => {
      //

      //
      if (!topicsInKafka.includes(typeTask)) {
        const topic: ITopicConfig = { topic: typeTask };
        await admin.createTopics({
          topics: [topic],
        });
      }

      //

      const consumer = this.kafka.consumer({
        groupId: `ms-kafka-${typeTask}`,
      });

      //
      await consumer.connect();
      await consumer.subscribe({
        topic: typeTask,
        fromBeginning: false,
      });
      this.consumers.push(consumer);
      const consumerRunConfig: ConsumerRunConfig = {
        eachMessage: async ({
          //@ts-ignore
          topic,
          //@ts-ignore
          partition,
          message,
        }: {
          topic: string;
          partition: number;
          message: any;
        }) => {
          //
          const messageJsonWithOutPayload = assign({}, JSON.parse(message.value));

          delete messageJsonWithOutPayload.payload;
          if (topic === 'documentAdditionOrUpdate') {
            const messageJson = JSON.parse(message.value)?.payload.payloadData || [];
            messageJson.forEach(async (item: IEventDrivenRequest) => {
              this.webSocketsGatewayService.sendMessageToAll(
                item?.websocketTopics,
                JSON.stringify(assign({}, { data: item }, { task: messageJsonWithOutPayload }))
              );
            });
          } else {
            this.webSocketsGatewayService.sendMessageToAll([topic], messageJsonWithOutPayload);
          }
        },
      };
      await consumer.run(consumerRunConfig);
    });
  }

  //
  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
