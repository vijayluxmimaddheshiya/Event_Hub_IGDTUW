'use client'
/*import { useEffect, useState } from "react";
import { type Message, initialMessages, ChatMessage } from "./chat-message";
import { useCookies } from "react-cookie";

const COOKIE_NAME = "next-openai-chatgpt";

// PreLoader Component
const PreLoader = () => (
  <div className="prompt left">
    <p className="name">AI</p>
    <div className="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

// InputMessage Component
type InputMessageProps = {
  input: string;
  setInput: (value: string) => void;
  sendMessage: (message: string) => void;
};

const InputMessage = ({ input, setInput, sendMessage }: InputMessageProps) => (
  <div className="question">
    <input
      type="text"
      aria-label="chat input"
      required
      value={input}
      placeholder="Type a message to start the conversation"
      onKeyDown={(e) => {
        if (e.key === "Enter" && input.trim() !== "") {
          sendMessage(input);
          setInput("");
        }
      }}
      onChange={(e) => setInput(e.target.value)}
    />
    <button
      type="submit"
      onClick={() => {
        if (input.trim() !== "") {
          sendMessage(input);
          setInput("");
        }
      }}
    >
      Ask
    </button>
  </div>
);

// ChatBox Component
export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies([COOKIE_NAME]);

  // Initialize cookie if not present
  useEffect(() => {
    if (!cookies[COOKIE_NAME]) {
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId, { path: "/" });
      console.debug("Cookie set:", randomId); // Debugging cookie setup
    }
  }, [cookies, setCookie]);

  // Send Message Function
  const sendMessage = async (message: string) => {
    try {
      setLoading(true);

      const newMessages = [
        ...messages,
        { message, who: "user" } as Message,
      ];
      setMessages(newMessages);

      console.debug("Sending messages:", newMessages); // Debugging outgoing messages

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
          user: cookies[COOKIE_NAME],
        }),
      });

      if (!response.ok) {
        console.error("Failed to fetch response:", response.statusText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.debug("Received response:", data); // Debugging API response

      setMessages([
        ...newMessages,
        { message: data.text.trim(), who: "bot" } as Message,
      ]);
    } catch (error) {
      console.error("Error in sendMessage:", error); // Debugging errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dialogue">
      {messages.map(({ message, who }, index) => (
        <ChatMessage key={index} who={who} message={message} />
      ))}

      {loading && <PreLoader />}

      <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
}
*/

'use client';

import { useEffect, useState } from "react";
import { type Message, initialMessages, ChatMessage } from "./chat-message";
import { useCookies } from "react-cookie";

const COOKIE_NAME = "next-openai-chatgpt";

// PreLoader Component
const PreLoader = () => (
  <div className="prompt left">
    <p className="name">AI</p>
    <div className="loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

// InputMessage Component
type InputMessageProps = {
  input: string;
  setInput: (value: string) => void;
  sendMessage: (message: string) => void;
};

const InputMessage = ({ input, setInput, sendMessage }: InputMessageProps) => (
  <div className="question">
    <input
      type="text"
      aria-label="chat input"
      required
      value={input}
      placeholder="Type a message to start the conversation"
      onKeyDown={(e) => {
        if (e.key === "Enter" && input.trim() !== "") {
          sendMessage(input);
          setInput("");
        }
      }}
      onChange={(e) => setInput(e.target.value)}
    />
    <button
      type="submit"
      onClick={() => {
        if (input.trim() !== "") {
          sendMessage(input);
          setInput("");
        }
      }}
    >
      Ask
    </button>
  </div>
);

// ChatBox Component
export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies([COOKIE_NAME]);
  const [isVisible, setIsVisible] = useState(false); // Visibility state

  // Initialize cookie if not present
  useEffect(() => {
    if (!cookies[COOKIE_NAME]) {
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId, { path: "/" });
      console.debug("Cookie set:", randomId); // Debugging cookie setup
    }
  }, [cookies, setCookie]);

  // Send Message Function
  const sendMessage = async (message: string) => {
    try {
      setLoading(true);

      const newMessages = [
        ...messages,
        { message, who: "user" } as Message,
      ];
      setMessages(newMessages);

      console.debug("Sending messages:", newMessages); // Debugging outgoing messages

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
          user: cookies[COOKIE_NAME],
        }),
      });

      if (!response.ok) {
        console.error("Failed to fetch response:", response.statusText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.debug("Received response:", data); // Debugging API response

      setMessages([
        ...newMessages,
        { message: data.text.trim(), who: "bot" } as Message,
      ]);
    } catch (error) {
      console.error("Error in sendMessage:", error); // Debugging errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        className="fixed bottom-5 right-5 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "✖ Close Chat" : "💬 Chat"}
      </button>

      {/* Chatbox UI */}
      {isVisible && (
        <div className="fixed bottom-20 right-5 z-50 bg-white w-80 h-96 rounded-lg shadow-lg flex flex-col">
          {/* Chatbox Header */}
          <div className="bg-blue-500 text-white p-2 flex justify-between items-center">
            <span className="font-bold">Chat</span>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-gray-200"
            >
              ✖
            </button>
          </div>

          {/* Chatbox Messages */}
          <div className="dialogue flex-grow p-2 overflow-y-auto">
            {messages.map(({ message, who }, index) => (
              <ChatMessage key={index} who={who} message={message} />
            ))}
            {loading && <PreLoader />}
          </div>

          {/* Chatbox Input */}
          <InputMessage
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
          />
        </div>
      )}
    </div>
  );
}
