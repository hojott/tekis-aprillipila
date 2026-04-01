import type { NextApiRequest, NextApiResponse } from 'next';

const chatbotHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { message } = req.body;

        // Here you would typically call your chatbot logic or an external API
        // For demonstration, we'll just echo the message back
        const responseMessage = `You said: ${message}`;

        res.status(200).json({ response: responseMessage });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default chatbotHandler;