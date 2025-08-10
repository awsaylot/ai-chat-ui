'use client';

import { useState, useEffect, useRef } from 'react';
import MessageBubble from '@/components/chat/MessageBubble';
import MessageInput from '@/components/chat/MessageInput';
import { Message } from '@/types/chat';
import { Terminal, Cpu, Zap } from 'lucide-react';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'SYSTEM INITIALIZED...\nAI NEURAL NETWORK ONLINE\nAWAITING USER INPUT...',
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      isLoading: true,
    };
    
    setMessages(prev => [...prev, loadingMessage]);

    // Simulate processing with hacker-style responses
    setTimeout(() => {
      const hackerResponses = [
        `PROCESSING QUERY: "${content}"\n\n> NEURAL PATHWAYS ACTIVATED\n> ANALYZING INPUT PATTERNS...\n> GENERATING RESPONSE MATRIX...\n\nCOMPLETE. DEEPSEEK CORE STANDING BY FOR NEXT COMMAND.`,
        `QUERY RECEIVED: ${content}\n\n[SYSTEM] Initializing response protocol...\n[CORE] DeepSeek neural network engaged\n[OUTPUT] Ready for deployment\n\nAWAITING FURTHER INSTRUCTIONS...`,
        `>>> PROCESSING REQUEST\n>>> ACCESSING KNOWLEDGE BASE\n>>> COMPILING RESPONSE\n\nINPUT: "${content}"\nSTATUS: ACKNOWLEDGED\nNEXT: AWAITING LLM INTEGRATION`,
      ];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: hackerResponses[Math.floor(Math.random() * hackerResponses.length)],
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => prev.slice(0, -1).concat(assistantMessage));
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main className="h-screen flex flex-col bg-black matrix-bg">
      {/* Cyberpunk Header */}
      <div className="bg-black border-b border-green-500 px-6 py-4 neon-border">
        <div className="flex items-center gap-3">
          <Terminal className="w-8 h-8 text-green-400" />
          <div>
            <h1 className="text-2xl font-bold text-green-400 neon-text glitch">
              NEURAL.INTERFACE.v2.1
            </h1>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-green-300 flex items-center gap-1">
                <Cpu className="w-4 h-4" />
                DEEPSEEK-CODER-6.7B
              </span>
              <span className="text-green-300 flex items-center gap-1">
                <Zap className="w-4 h-4" />
                STATUS: ONLINE
              </span>
              <span className="text-green-300 terminal-cursor">READY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-black">
          <div className="min-h-full">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <MessageInput 
          onSendMessage={handleSendMessage} 
          disabled={isLoading}
        />
      </div>
    </main>
  );
}