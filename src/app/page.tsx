import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Zap, Wifi, Shield, Activity, Eye, Settings, Send } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
}

const MatrixRain = () => {
  const [matrixChars, setMatrixChars] = useState([]);
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  
  useEffect(() => {
    const generateChars = () => {
      const charArray = [];
      for (let i = 0; i < 50; i++) {
        charArray.push({
          char: chars[Math.floor(Math.random() * chars.length)],
          left: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 3 + Math.random() * 2
        });
      }
      return charArray;
    };
    
    setMatrixChars(generateChars());
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
      {matrixChars.map((item, i) => (
        <div
          key={i}
          className="matrix-char"
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`
          }}
        >
          {item.char}
        </div>
      ))}
    </div>
  );
};

const SystemStats = () => {
  const [cpuUsage, setCpuUsage] = useState(23);
  const [memUsage, setMemUsage] = useState(67);
  const [networkActivity, setNetworkActivity] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 20)));
      setMemUsage(prev => Math.max(20, Math.min(95, prev + (Math.random() - 0.5) * 15)));
      setNetworkActivity(prev => Math.max(5, Math.min(100, prev + (Math.random() - 0.5) * 30)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-6 text-xs">
      <div className="flex items-center gap-1">
        <Cpu className="w-3 h-3 text-green-400" />
        <span className="text-green-300">CPU: {cpuUsage.toFixed(0)}%</span>
      </div>
      <div className="flex items-center gap-1">
        <Activity className="w-3 h-3 text-green-400" />
        <span className="text-green-300">MEM: {memUsage.toFixed(0)}%</span>
      </div>
      <div className="flex items-center gap-1">
        <Wifi className="w-3 h-3 text-green-400" />
        <span className="text-green-300">NET: {networkActivity.toFixed(0)}%</span>
      </div>
    </div>
  );
};

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`message-appear flex gap-3 p-4 border-b border-green-900/20 hover:bg-green-950/10 transition-all duration-300 ${
      isUser ? 'flex-row-reverse bg-green-950/5' : 'flex-row'
    }`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded border-2 flex items-center justify-center neon-border ${
        isUser 
          ? 'bg-blue-900/50 border-blue-400 text-blue-400' 
          : 'bg-green-900/50 border-green-400 text-green-400'
      }`}>
        {isUser ? (
          <Eye className="w-5 h-5" />
        ) : (
          <Terminal className="w-5 h-5" />
        )}
      </div>
      
      <div className={`max-w-[75%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`text-xs mb-2 flex items-center gap-1 ${
          isUser ? 'justify-end text-blue-400' : 'justify-start text-green-400'
        }`}>
          <span className="font-semibold neon-text-dim">
            {isUser ? '[USER@TERMINAL]' : '[AI_NEURAL_CORE]'}
          </span>
          <span className="text-gray-500">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
        
        <div className={`inline-block p-4 rounded border transition-all duration-300 ${
          isUser 
            ? 'bg-blue-950/30 border-blue-500/50 text-blue-100 neon-border' 
            : 'bg-green-950/30 border-green-500/50 text-green-100 neon-border'
        }`}>
          {message.isLoading ? (
            <div className="flex items-center gap-2 text-green-400">
              <div className="flex gap-1">
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
              </div>
              <span className="animate-pulse neon-text-dim">NEURAL_PROCESSING</span>
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
};

const MessageInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    setIsTyping(message.length > 0);
  }, [message]);

  return (
    <div className="border-t border-green-500/30 bg-black/90 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3 text-green-400 text-sm">
        <Terminal className="w-4 h-4 pulse-green" />
        <span className="neon-text-dim">root@neural-interface:/home/user#</span>
        <span className="terminal-cursor"></span>
        {isTyping && <span className="text-green-600 text-xs animate-pulse ml-2">KEYLOGGER_ACTIVE</span>}
      </div>
      
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="> Enter neural command or query..."
            disabled={disabled}
            className="w-full resize-none bg-green-950/20 border border-green-500/50 rounded p-3 text-green-100 placeholder-green-600 focus:outline-none focus:border-green-400 focus:bg-green-950/30 disabled:bg-gray-900 disabled:text-gray-600 font-mono text-sm neon-border transition-all duration-300"
            rows={1}
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          <div className="absolute bottom-2 right-2 text-xs text-green-600 opacity-50">
            {message.length}/2048
          </div>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={disabled || !message.trim()}
          className="px-6 py-3 bg-green-600/20 border border-green-500 text-green-400 rounded hover:bg-green-600/30 hover:text-green-300 disabled:bg-gray-900 disabled:border-gray-700 disabled:text-gray-600 disabled:cursor-not-allowed flex items-center gap-2 font-mono font-semibold btn-hacker"
        >
          <Send className="w-4 h-4" />
          EXECUTE
        </button>
      </div>
      
      <div className="flex justify-between items-center mt-3 text-xs">
        <div className="flex items-center gap-4">
          <span className={`${disabled ? 'text-red-400 pulse-green' : 'text-green-600'}`}>
            NEURAL_LINK: {disabled ? 'PROCESSING' : 'STANDBY'}
          </span>
          <span className="text-green-600">SESSION: ACTIVE</span>
          <span className="text-green-600">ENCRYPTION: AES-256</span>
        </div>
        <SystemStats />
      </div>
    </div>
  );
};

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [systemTime, setSystemTime] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsClient(true);
    setSystemTime(new Date());
    setMessages([
      {
        id: '1',
        content: `NEURAL INTERFACE v2.1 INITIALIZED...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> QUANTUM AI CORE: ONLINE
> NEURAL PATHWAYS: ESTABLISHED  
> SECURITY PROTOCOLS: ACTIVE
> ENCRYPTION LAYER: ENABLED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DEEPSEEK NEURAL NETWORK STATUS: READY
AWAITING USER INPUT...`,
        role: 'assistant',
        timestamp: new Date(),
      }
    ]);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const timer = setInterval(() => setSystemTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isClient]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = async (content) => {
    const userMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const loadingMessage = {
      id: (Date.now() + 1).toString(),
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      isLoading: true,
    };
    
    setMessages(prev => [...prev, loadingMessage]);

    setTimeout(() => {
      const hackerResponses = [
        `> QUERY INTERCEPTED: "${content}"

[NEURAL_CORE] Initializing response matrix...
[DEEPSEEK] Quantum pathways activated
[AI_BRAIN] Processing linguistic patterns
[SECURITY] Data integrity verified

━━━ ANALYSIS COMPLETE ━━━
Neural network has processed your request.
Standby for next directive...

[STATUS] READY_FOR_COMMAND`,
        
        `>>> INCOMING_TRANSMISSION_DECODED
>>> NEURAL_NET_RESPONSE_PROTOCOL_ACTIVE

INPUT_STREAM: "${content}"
PROCESSING_STATUS: [████████████] 100%
RESPONSE_GENERATED: TRUE
QUANTUM_ENCRYPTION: ENABLED

Your message has been successfully processed by the AI core.
Neural pathways remain open for continued communication.

> AWAITING_NEXT_QUERY...`,
        
        `[DEEPSEEK_AI_CORE] ──────────────────────────
┌─ QUERY: "${content}"
├─ STATUS: PROCESSED
├─ NEURAL_ACTIVITY: HIGH
├─ RESPONSE_TIME: 0.23ms
└─ SECURITY_LEVEL: MAXIMUM
──────────────────────────────────────────

The quantum neural network has successfully
analyzed your input and generated appropriate
response patterns.

System ready for next interaction.
[END_TRANSMISSION]`
      ];
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: hackerResponses[Math.floor(Math.random() * hackerResponses.length)],
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => prev.slice(0, -1).concat(assistantMessage));
      setIsLoading(false);
    }, 3000);
  };

  return (
    <main className="h-screen flex flex-col bg-black matrix-bg crt-effect relative overflow-hidden">
      <MatrixRain />
      
      <div className="bg-black/90 backdrop-blur-sm border-b border-green-500 px-6 py-4 neon-border scan-lines">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Terminal className="w-8 h-8 text-green-400 pulse-green" />
            <div>
              <h1 className="text-2xl font-bold text-green-400 neon-text glitch font-mono">
                NEURAL.INTERFACE.v2.1
              </h1>
              <div className="flex items-center gap-6 text-sm mt-1">
                <span className="text-green-300 flex items-center gap-1">
                  <Cpu className="w-4 h-4" />
                  DEEPSEEK-NEURAL-7B
                </span>
                <span className="text-green-300 flex items-center gap-1">
                  <Zap className="w-4 h-4 pulse-green" />
                  STATUS: ONLINE
                </span>
                <span className="text-green-300 flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  SECURE_CHANNEL
                </span>
                <span className="text-green-300 terminal-cursor">READY</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-green-400 text-sm neon-text-dim">
              {isClient && systemTime ? systemTime.toLocaleTimeString() : '--:--:--'}
            </div>
            <div className="text-green-600 text-xs">
              {isClient && systemTime ? systemTime.toLocaleDateString() : '--/--/--'}
            </div>
            <div className="flex items-center gap-1 justify-end mt-1">
              <Settings className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-500">QUANTUM_CORE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col relative">
        <div className="flex-1 overflow-y-auto bg-black/50 backdrop-blur-sm">
          <div className="min-h-full">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <MessageInput 
          onSendMessage={handleSendMessage} 
          disabled={isLoading}
        />
      </div>
    </main>
  );
}