"use client";
import { useProductChat } from "./hooks/use-product-chat";
import { ChatMessage } from "./components/chat-message";
import { ChatInput } from "./components/chat-input";
import { ChatLoader } from "./components/chat-loader";
import { Conversation, ConversationContent } from "@/components/ai-elements/conversation";

export default function Home() {
  const { messages, input, isLoading, submitMessage, updateInput } = useProductChat();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMessage(input);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateInput(e.target.value);
  }

  const showLoader = isLoading && (messages.length === 0 || messages[messages.length - 1].role === "user");
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
            {showLoader && <ChatLoader />}
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
