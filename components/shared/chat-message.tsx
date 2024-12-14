export type Message = {
    who: "bot" | "user" | undefined;
    message?: string;
  };
  
  export const initialMessages: Message[] = [
    {
      who: "bot",
      message: "Hi! I'm a Eva, your AI assistant. Ask me anything!",
    },
  ];
  
  type ChatMessageProps = {
    who?: "bot" | "user";
    message?: string;
  };
  
  export function ChatMessage({ who = "bot", message }: ChatMessageProps) {
    if (!message) {
      return null;
    }
  
    return (
      <div className={`prompt ${who !== "bot" ? "right" : "left"}`}>
        <div className="flex gap-5">
          <p className="name">{who !== "bot" ? "You" : "Eva"}</p>
          <p className="msg">{message}</p>
        </div>
      </div>
    );
  }
  