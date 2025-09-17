"use client";
import { useProductChat } from "./hooks/use-product-chat";
import { ChatLoader } from "./components/chat-loader";
import { ChatMessage } from "./components/chat-message";

export default function Home() {
  const { messages, input, isLoading, startChat, handleSubmit, handleInputChange } = useProductChat();
  return (
    <div className="font-sans min-h-screen p-8 max-w-xl mx-auto">
      {
        isLoading && (
          <ChatLoader />
        )
      }
      {
        messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))
      }
    </div>
  );
}
