
'use client';

import { MessageCircle } from 'lucide-react';

export default function ChatbotTriggerButton() {
  const handleClick = () => {
    // Trigger chatbot open
    const chatbotButton = document.querySelector(
      '[aria-label="Open chat"]'
    ) as HTMLButtonElement;
    chatbotButton?.click();
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center px-6 py-3 border-2 border-accent text-accent rounded-lg hover:bg-accent/5 transition-colors font-semibold"
    >
      <MessageCircle className="w-5 h-5 mr-2" />
      Chat with AI Assistant
    </button>
  );
}
