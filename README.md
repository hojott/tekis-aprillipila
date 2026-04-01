# Chatbot Next.js Project

This project is a simple chatbot application built using Next.js. The entire website is designed as a single large chatbox, providing an interactive interface for users to communicate with the chatbot.

## Project Structure

```
chatbot-nextjs
├── public                # Static files
├── src
│   ├── components        # React components
│   │   └── Chatbox.tsx   # Chatbox component
│   ├── pages             # Next.js pages
│   │   ├── api
│   │   │   └── chatbot.ts # API route for chatbot
│   │   └── index.tsx     # Main entry point
│   ├── styles            # CSS styles
│   │   └── Chatbox.module.css # Styles for Chatbox component
│   └── utils             # Utility functions
│       └── apiClient.ts  # API client for making requests
├── package.json          # npm configuration
├── next.config.js        # Next.js configuration
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd chatbot-nextjs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000` to view the chatbot interface.

## Usage Guidelines

- Type your message in the chatbox and press enter to send it.
- The chatbot will respond based on the logic defined in the API.

## Additional Information

- The chatbot API is defined in `src/pages/api/chatbot.ts`, where you can customize the logic for processing user messages.
- The chat interface is managed in the `Chatbox` component located in `src/components/Chatbox.tsx`.
- Styles for the chatbox can be modified in `src/styles/Chatbox.module.css`.

Feel free to explore and modify the code to enhance the chatbot's functionality!