"use client";
import { useProductChat } from "./hooks/use-product-chat";
import { ChatMessage } from "./components/chat-message";
import { ChatInput } from "./components/chat-input";
import { Conversation, ConversationContent } from "@/components/ai-elements/conversation";

export default function Home() {
  const { messages, input, isLoading, handleSubmit, handleInputChange } = useProductChat();
  return (
    <div className="font-sans h-screen mx-auto overflow-hidden">
      <div className="flex flex-col h-full">
        <Conversation>
          <ConversationContent className="max-w-xl mx-auto">
            {
              messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            }
          </ConversationContent>
        </Conversation>

        <div className="max-w-2xl w-full mx-auto pb-4">
          <ChatInput
            input={input}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
