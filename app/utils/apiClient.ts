import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'https://your-chatbot-api-url.com';

export const sendMessage = async (message) => {
    try {
        const response = await axios.post(`${API_URL}/send`, { message });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const getResponse = async (messageId) => {
    try {
        const response = await axios.get(`${API_URL}/response/${messageId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching response:', error);
        throw error;
    }
};