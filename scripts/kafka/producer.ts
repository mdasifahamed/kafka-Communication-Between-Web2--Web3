import { Kafka } from "kafkajs";
import generateRandomOrder from "../orders/dummyOrderGenartor";
const numberOfOrders = parseInt(process.argv[2])

const kafka = new Kafka({
    clientId: 'order-producer',
    brokers: ['localhost:9092'], // Update if your broker differs
});

const producer = kafka.producer();

async function sendOrders() {
    await producer.connect();
    let totalOrders = generateRandomOrder(numberOfOrders);
    for (let i = 1; i <= totalOrders.length; i++) {

        await producer.send({
            topic: 'orders',
            messages: [{ value: JSON.stringify(totalOrders[i]) }],
        });

        console.log(`Order sent:`, totalOrders[i].orderId);
    }

    await producer.disconnect();
}

sendOrders().catch(console.error);