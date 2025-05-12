import { Kafka } from 'kafkajs';
import { Piscina } from 'piscina';
import path from 'path';

// Kafka Clinet Initliazation
const kafka = new Kafka({
    clientId: 'order-consumer',
    brokers: ['localhost:9092'],
});

// Consumer Creation
const consumer = kafka.consumer({ groupId: 'order-group' });

// Worker Is Coming From here 
const pool = new Piscina({
    filename: path.resolve(__dirname, '../worker/quoter.ts'),
    maxThreads: 2,// for parallelism
});

async function start() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'orders', fromBeginning: true }); // subcribing to order topic 

    await consumer.run({
        eachMessage: async ({ message }) => {
            const value = message.value?.toString();
            if (!value) return;

            pool.run({ order: value }).catch((err) => {
                console.error('Worker error:', err);
            });
        },
    });
}

start().catch(console.error);