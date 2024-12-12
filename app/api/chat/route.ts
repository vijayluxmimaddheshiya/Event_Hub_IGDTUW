import { type NextRequest, NextResponse } from "next/server";
import { initialMessages, type Message } from "@/components/shared/chat-message";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing Environment Variable OPENAI_API_KEY");
}

const botName = "AI";
const userName = "User";

// Function to generate the prompt from message history
const generatePromptFromMessages = (messages: Message[]) => {
  let prompt = "";
  prompt += messages[1].message; // Assuming the first message is some system or initial message
  const messagesWithoutFirstConvo = messages.slice(2);

  if (messagesWithoutFirstConvo.length == 0) {
    return prompt;
  }

  messagesWithoutFirstConvo.forEach((message: Message) => {
    const name = message.who === "user" ? userName : botName;
    prompt += `\n${name}: ${message.message}`;
  });
  return prompt;
};

export const config = {
  runtime: "edge", // Edge runtime configuration
};

// Named export for POST method instead of default export
export async function POST(req: NextRequest) {
  const body = await req.json();
  const messagesPrompt = generatePromptFromMessages(body.messages);
  
  // Prepare the payload for the new model API
  const payload = {
    model: "gpt-3.5-turbo", // Change model to gpt-3.5-turbo
    messages: [
      { role: "system", content: "You are a helpful assistant." }, // Optional system message for context
      ...body.messages.map((msg: Message) => ({
        role: msg.who === "user" ? "user" : "assistant", // Map message to correct role
        content: msg.message, // Content of the message
      })),
    ],
    max_tokens: 200, // Maximum tokens for the response
    temperature: 0.7, // Controls randomness of the model's responses
    top_p: 1, // Controls diversity of responses
    frequency_penalty: 0, // Penalizes repetition in responses
    presence_penalty: 0, // Penalizes frequent topics
    user: body?.user, // Optional user identifier for tracking
  };

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json", // Request content type
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // OpenAI API key authorization
  };

  // Making the API request to OpenAI's chat completions endpoint
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: requestHeaders,
    method: "POST",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.error) {
    console.error("OpenAI API error: ", data.error);
    return NextResponse.json({
      text: `ERROR with API integration. ${data.error.message}`,
    });
  }

  // Return the response text from the model
  return NextResponse.json({ text: data.choices[0].message.content });
}
