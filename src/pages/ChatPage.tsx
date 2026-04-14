import React, { useState, useEffect, useRef } from 'react';
import PriceChart from '../components/PriceChart';
import PortfolioChart from '../components/PortfolioChart';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
  chartData?: number[];
  portfolioData?: any[];
}

export default function ChatPage() {
  
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('finchat_messages');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, text: "Merhaba! Ben FinChat. Bugün hangi finansal veriyi inceleyelim?", sender: 'ai', timestamp: '10:00' }
    ];
  });

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Ekranın en altını işaretleyeceğimiz Ref (Çapa)
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // O çapaya yumuşakça (smooth) kaydırmayı sağlayan fonksiyon
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // messages dizisi her değiştiğinde (yeni kelime aktığında) aşağı kaydır
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('finchat_messages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const formattedHistory = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    const aiMsgId = Date.now() + 1;
    const initialAiMsg: Message = {
      id: aiMsgId,
      text: '',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, initialAiMsg]);

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: inputText, 
          history: formattedHistory 
        })
      });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      setIsLoading(false);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        // METADATA işaretleyicisini kontrol et
        if (chunkValue.includes("[METADATA]")) {
          const parts = chunkValue.split("[METADATA]");
          const textPart = parts[0];
          const jsonString = parts[1];

          // Önce işaretçiden kalan son metin parçasını ekle
          setMessages(prev => prev.map(msg => 
            msg.id === aiMsgId 
              ? { ...msg, text: msg.text + textPart } 
              : msg
          ));

          // JSON verisini parse et ve uygun grafik state'ine yerleştir
          try {
            const parsedMetadata = JSON.parse(jsonString);
            setMessages(prev => prev.map(msg => {
              if (msg.id === aiMsgId) {
                return {
                  ...msg,
                  // GÜNCEL: Type kontrolü yerine veri var mı diye bakıyoruz
                  ...(parsedMetadata.chartData && { chartData: parsedMetadata.chartData }),
                  ...(parsedMetadata.portfolioData && { portfolioData: parsedMetadata.portfolioData })
                };
              }
              return msg;
            }));
          } catch (e) {
            console.error("Metadata Parse Hatası:", e);
          }
        } else {
          // Normal metin akışı devam ediyorsa sadece text'e ekle
          setMessages(prev => prev.map(msg => 
            msg.id === aiMsgId 
              ? { ...msg, text: msg.text + chunkValue } 
              : msg
          ));
        }
      }
    } catch (error) {
      console.error("Hata:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-fin-light dark:bg-fin-dark">
      {/* Header */}
      <header className="p-4 bg-white dark:bg-fin-card border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 bg-fin-primary rounded-full flex items-center justify-center text-white font-bold">FC</div>
        <div>
          <h2 className="font-bold text-slate-800 dark:text-white">FinChat AI</h2>
          <p className="text-xs text-fin-primary">Çevrimiçi</p>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`w-full flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-fin-card text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-800'
            }`}>
              
              {/* YENİ: Düz <p> etiketi yerine ReactMarkdown kullanıyoruz */}
              <div className="text-sm leading-relaxed overflow-hidden">
                <ReactMarkdown
                  components={{
                    // Paragraflar arasına boşluk koy
                    p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                    // Kalın yazıları belirginleştir
                    strong: ({node, ...props}) => <strong className="font-bold text-slate-900 dark:text-white" {...props} />,
                    // Başlıkları (###) büyüt ve şekillendir
                    h3: ({node, ...props}) => <h3 className="text-md font-bold mt-3 mb-1 text-fin-primary" {...props} />,
                    // Listeleri daha şık göster
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className="" {...props} />,
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>

              {/* Grafiklerimiz (Aynı kalıyor) */}
              {msg.sender === 'ai' && msg.chartData && (
                <PriceChart data={msg.chartData} />
              )}
              {msg.sender === 'ai' && msg.portfolioData && (
                <PortfolioChart data={msg.portfolioData} />
              )}
              
              <span className="text-[10px] opacity-70 mt-1 block text-right">{msg.timestamp}</span>
            </div>
          </div>
        ))}
        {isLoading && <div className="text-xs text-slate-500 animate-pulse">FinChat düşünüyor...</div>}

        {/* YENİ: Otomatik kaydırma için ekranın sonuna koyduğumuz görünmez çapa */}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="p-4 bg-white dark:bg-fin-card border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Mesajınızı yazın..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-fin-primary outline-none dark:text-white"
          />
          <button 
            onClick={handleSendMessage}
            className="bg-fin-primary text-white p-3 rounded-xl hover:scale-105 active:scale-95 transition-transform"
          >
            <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}