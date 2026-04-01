import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const opts = {
    apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(opts);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, model } = body;

        if (!message || !model) {
            return NextResponse.json({ error: 'Missing required fields: message or model' }, { status: 400 });
        }

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const completion = await openai.responses.create({
                        model,
                        input: [{ role: 'user', content: message }],
                        tools: [{type: 'web_search',}],
                        stream: true,
                    });

                    for await (const chunk of completion) {
                        console.log(chunk);
                        const text = chunk.delta || '';
                        controller.enqueue(encoder.encode(text));
                    }

                    controller.close();
                } catch (error) {
                    console.error('Error with OpenAI API:', error);
                    controller.error(error);
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
            },
        });
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        return NextResponse.json({ error: 'Failed to fetch response from OpenAI API' }, { status: 500 });
    }
}

const encoder = new TextEncoder();