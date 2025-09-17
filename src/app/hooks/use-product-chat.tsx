import { useState, useEffect } from "react";
import type { Message, ConversationMessage } from "@/lib/types";

export function useProductChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    startChat();
  }, []);

  const startChat = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-product", {
        method: "POST",
        body: JSON.stringify({ isStart: true }),
      });


      if (!response.ok) {
        throw new Error("Failed to generate product");
      }

      const data = await response.json();

      const messageId = crypto.randomUUID();

      const newMessage: Message = {
        id: messageId,
        content: data.product,
        role: "assistant",
        imageLoading: true,
      };

      setMessages([newMessage]);
      generateImage(messageId, data.imagePrompt);
    } catch (error) {
      console.error("Error generating product", error);
    } finally {
      setIsLoading(false);
    }
  }

  const generateImage = async (messageId: string, imagePrompt: string) => {
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        body: JSON.stringify({
          imagePrompt: imagePrompt,
        }),
      })
  
      if (!response.ok) {
        throw new Error("Failed to generate image");
      }
  
      const imageData = await response.json()
  
      setMessages(prevMessages => prevMessages.map(message => {
        if (message.id === messageId) {
          return { ...message, image: imageData.image, imageLoading: false }
        }
  
        return message;
      }))
  
    } catch (error) {
      setMessages(prevMessages => prevMessages.map(message => {
        if (message.id === messageId) {
          return { ...message, imageLoading: false }
        }

        return message;
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      role: "user",
    }

    setIsLoading(true);
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    try {
      const response = await fetch("/api/generate-product", {
        method: "POST",
        body: JSON.stringify({
          userMessage: input,
          conversationHistory: messages,
          isStart: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate product");
      }

      const data = await response.json();
    
      const messageId = crypto.randomUUID();

      const assistantMessage: Message = {
        id: messageId,
        content: data.product,
        role: "assistant",
        imageLoading: true,
      }

      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      generateImage(messageId, data.imagePrompt);
    } catch (error) {
      console.error("Error generating product", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }

  return { messages, input, isLoading, startChat, handleSubmit, handleInputChange }
}
