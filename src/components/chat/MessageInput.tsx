'use client';

import { useState } from 'react';
import { Send, Terminal } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-green-500/30 bg-black p-4">
      {/* Terminal prompt line */}
      <div className="flex items-center gap-2 mb-2 text-green-400 text-sm">
        <Terminal className="w-4 h-4" />
        <span>user@neural-interface:~$</span>
        <span className="terminal-cursor"></span>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter command or query..."
            disabled={disabled}
            className="w-full resize-none bg-green-950/20 border border-green-500/50 rounded p-3 text-green-100 placeholder-green-600 focus:outline-none focus:border-green-400 focus:bg-green-950/30 disabled:bg-gray-900 disabled:text-gray-600 font-mono text-sm neon-border"
            rows={1}
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
        </div>
        
        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className="px-6 py-3 bg-green-600/20 border border-green-500 text-green-400 rounded hover:bg-green-600/30 hover:text-green-300 disabled:bg-gray-900 disabled:border-gray-700 disabled:text-gray-600 disabled:cursor-not-allowed flex items-center gap-2 font-mono font-semibold transition-all neon-border"
        >
          <Send className="w-4 h-4" />
          EXEC
        </button>
      </form>
      
      {/* Status bar */}
      <div className="flex justify-between items-center mt-2 text-xs text-green-600">
        <span>NEURAL_LINK: {disabled ? 'PROCESSING' : 'READY'}</span>
        <span>CHARS: {message.length}</span>
      </div>
    </div>
  );
}