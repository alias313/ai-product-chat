"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api/generate-product", {
      method: "POST",
      body: JSON.stringify({
        userMessage: "I want to design a modular car",
        conversationHistory: [],
        isStart: true,
      }),
    }).then(res => res.json())
      .then(data => {
        fetch("/api/generate-image", {
          method: "POST",
          body: JSON.stringify({
            imagePrompt: data.imagePrompt,
          }),
        }).then(res => res.json())
          .then(imageData => {
            console.log("Generated image", imageData);
          })
          .catch(error => {
            console.error("Error generating image", error);
          });
      })
      .catch(error => {
        console.error("Error generating product", error);
      });
  })
  return (
    <div className="font-sans min-h-screen p-8">
      Product design chat app
    </div>
  );
}
