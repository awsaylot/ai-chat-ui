import { Message } from '@/types/chat';
import { User, Bot, Loader2, ChevronRight } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-3 p-4 border-b border-green-900/20 hover:bg-green-950/10 transition-colors ${
      isUser ? 'flex-row-reverse bg-green-950/5' : 'flex-row'
    }`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-10 h-10 rounded border-2 flex items-center justify-center ${
        isUser 
          ? 'bg-blue-900/50 border-blue-400 text-blue-400' 
          : 'bg-green-900/50 border-green-400 text-green-400'
      }`}>
        {isUser ? (
          <User className="w-5 h-5" />
        ) : (
          <Bot className="w-5 h-5" />
        )}
      </div>
      
      {/* Message content */}
      <div className={`max-w-[75%] ${isUser ? 'text-right' : 'text-left'}`}>
        {/* Role label */}
        <div className={`text-xs mb-1 flex items-center gap-1 ${
          isUser ? 'justify-end text-blue-400' : 'justify-start text-green-400'
        }`}>
          {!isUser && <ChevronRight className="w-3 h-3" />}
          <span className="font-semibold">
            {isUser ? '[USER]' : '[AI_CORE]'}
          </span>
          <span className="text-gray-500">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        {/* Message bubble */}
        <div className={`inline-block p-4 rounded border ${
          isUser 
            ? 'bg-blue-950/30 border-blue-500/50 text-blue-100' 
            : 'bg-green-950/30 border-green-500/50 text-green-100'
        }`}>
          {message.isLoading ? (
            <div className="flex items-center gap-2 text-green-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="animate-pulse">PROCESSING...</span>
              <span className="terminal-cursor">{'>'}</span>
            </div>
          ) : (
            <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {message.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}