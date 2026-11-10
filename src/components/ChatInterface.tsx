"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatInterface({ level }: { level: string }) {
  const [messages, setMessages] = useState<{role: 'user' | 'tutor', content: string}[]>([
    { role: 'tutor', content: `Hi there! I'm your English tutor. I'm adapting to your current level (${level}). How can I help you today?` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Auditory immersion states
  const [isListening, setIsListening] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('teachai_autoplay_audio');
    if (saved === 'true') setAutoPlayAudio(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleAutoPlay = () => {
    const newVal = !autoPlayAudio;
    setAutoPlayAudio(newVal);
    localStorage.setItem('teachai_autoplay_audio', String(newVal));
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; 
    utterance.rate = 0.95; 
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Aparentemente tu navegador no soporta el reconocimiento de voz nativo. Por favor usa Google Chrome, Safari o Edge.");
      return;
    }

    if (isListening) {
      if (recognitionInstance) recognitionInstance.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; 
    recognition.interimResults = true;
    
    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
         setInput(prev => prev.trim() + (prev.trim() ? ' ' : '') + finalTranscript);
      }
    };

    recognition.onerror = (e: any) => {
      console.error("Speech recognition error", e);
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    setRecognitionInstance(recognition);
    setIsListening(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (isListening && recognitionInstance) {
       recognitionInstance.stop();
       setIsListening(false);
    }

    const userMessage = input.trim();
    setInput("");
    
    // Add user message immediately
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/tutor/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           message: userMessage,
           history: messages,
           level: level
        })
      });

      if (!response.ok) {
        const errData = await response.text();
        console.error("Backend Error payload:", errData);
        throw new Error(`Chat failed with status ${response.status}: ${errData}`);
      }

      const data = await response.json();
      const tutorResponse = data.response;
      
      setMessages(prev => [...prev, { role: 'tutor', content: tutorResponse }]);
      
      // Auto Play trigger
      if (autoPlayAudio) {
        speakText(tutorResponse);
      }

    } catch (error: any) {
      console.error("Error communicating with AI tutor:", error.message || error);
      const fallbackMsg = `Lo siento, tuve un problema conectándome (${error.message.substring(0,60)}...). ¿Podrías intentar de nuevo?`;
      setMessages(prev => [...prev, { role: 'tutor', content: fallbackMsg }]);
      
      if (autoPlayAudio) speakText(fallbackMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] md:h-[calc(100vh-140px)] bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden relative shadow-sm">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
      
      {/* Header */}
      <div className="p-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container text-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-xl">psychology</span>
          </div>
          <div>
            <h2 className="font-bold font-headline text-on-surface flex items-center gap-2">
              Tutor IA
              {isListening && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-error"></span>
                </span>
              )}
            </h2>
            <p className="text-xs text-on-surface-variant flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              En línea (Nivel {level})
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {/* Settings Config for Auto Play via state/localStorage */}
          <button 
            onClick={toggleAutoPlay}
            title={autoPlayAudio ? "Desactivar Auto-Play" : "Activar Auto-Play"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              autoPlayAudio ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {autoPlayAudio ? 'volume_up' : 'volume_off'}
            </span>
            {autoPlayAudio ? 'Auto-Play Activado' : 'Auto-Play Apagado'}
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 z-10 scrollbar-thin">
        {messages.map((message, idx) => (
          <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 relative group ${
              message.role === 'user' 
                ? 'bg-primary text-on-primary rounded-tr-sm shadow-sm' 
                : 'bg-surface-container-low border border-outline-variant/20 text-on-surface rounded-tl-sm'
            }`}>
              <p className="font-body text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
              
              {/* Optional manual play button on tutor messages */}
              {message.role === 'tutor' && (
                 <button 
                   onClick={() => speakText(message.content)}
                   className="absolute -right-10 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface-container shadow-sm flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                   title="Reproducir en voz alta"
                 >
                   <span className="material-symbols-outlined text-sm">play_arrow</span>
                 </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl rounded-tl-sm p-4 w-16 flex items-center justify-center gap-1">
              <span className="w-2 h-2 bg-on-surface-variant/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-on-surface-variant/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-on-surface-variant/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-surface-container-lowest z-10 border-t border-outline-variant/30">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje en inglés o activa el micrófono para hablar..."
              disabled={isLoading}
              className="w-full bg-surface-container-low outline-none border border-outline-variant/30 rounded-full pl-5 pr-12 py-3.5 text-sm font-body text-on-surface focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 transition-all shadow-inner"
            />
            {/* Mic button with conditional styling */}
            <button 
              type="button" 
              onClick={toggleListening}
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                 isListening ? 'bg-error text-white animate-pulse' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
              } disabled:opacity-50`}
              disabled={isLoading}
              title="Hablar (Dictado de voz)"
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
          </div>
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md disabled:bg-surface-container-high disabled:text-outline disabled:shadow-none transition-all active:scale-95"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
