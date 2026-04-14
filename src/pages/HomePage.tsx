import React from 'react';

export default function HomePage() {
  return (
    // Ana kapsayıcı: Tüm ekranı kaplar, dark mode ise fin-dark, değilse fin-light arka plan alır
    <div className="min-h-screen bg-fin-light dark:bg-fin-dark text-slate-800 dark:text-slate-100 flex flex-col items-center justify-center p-4 transition-colors duration-300">
      
      {/* Ortadaki Karşılama Kartı */}
      <div className="max-w-md w-full bg-white dark:bg-fin-card rounded-2xl shadow-xl p-8 text-center border border-slate-200 dark:border-slate-700">
        
        {/* Logo / İkon Alanı */}
        <div className="w-16 h-16 bg-fin-primary/10 text-fin-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>

        {/* Başlık ve Açıklama */}
        <h1 className="text-3xl font-bold mb-2">FinChat</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Yapay zeka destekli, gerçek zamanlı kripto ve borsa asistanınız.
        </p>

        {/* Aksiyon Butonu */}
        <button className="w-full bg-fin-primary hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-fin-primary/30">
          Sohbete Başla
        </button>

      </div>
      
      {/* Şirkete ufak bir mesaj :) */}
      <p className="mt-8 text-sm text-slate-400">
        Built for Beyond Technologies
      </p>

    </div>
  );
}