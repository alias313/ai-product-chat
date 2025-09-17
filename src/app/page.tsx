"use client";
import { useProductChat } from "./hooks/use-product-chat";

export default function Home() {
  const { messages, input, isLoading, startChat, handleSubmit, handleInputChange } = useProductChat();
  return (
    <div className="font-sans min-h-screen p-8">
      Product design chat app
    </div>
  );
}
