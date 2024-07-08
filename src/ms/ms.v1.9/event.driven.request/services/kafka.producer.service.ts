import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnApplicationShutdown {
  //

  //
  private kafka: Kafka;
  private producer: Producer;

  async onModuleInit() {
    this.kafka = new Kafka({
      clientId: 'MsProducerClient',
      brokers: process.env.KAFKA_BROKERS.split(','),
    });
    const producer = this.kafka.producer();
    await producer.connect();
    this.producer = producer;
  }

  //
  async onApplicationShutdown() {
    await this.producer.disconnect();
  }

  //
  async send(record: ProducerRecord): Promise<void> {
    await this.producer.send(record);
  }
}
