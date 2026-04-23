
interface HomePageProps {
  onStartChat: () => void;
}

export default function HomePage({ onStartChat }: HomePageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="max-w-md w-full backdrop-blur-md bg-white/90 dark:bg-fin-card/90 rounded-[2.5rem] shadow-2xl p-10 text-center border border-white/20 dark:border-slate-700/50 transform transition-all hover:shadow-emerald-500/5">
        
        <div className="relative w-24 h-24 mx-auto mb-8 group">
          <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-tr from-emerald-600 to-teal-400 text-white rounded-3xl shadow-lg rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 ease-out">
            <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              <path d="M8 13l3-3 2 2 3-3" className="opacity-90" />
            </svg>
          </div>
        </div>

        <div className="space-y-3 mb-10 text-slate-800 dark:text-slate-100">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
            FinChat
          </h1>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Yapay zeka destekli, gerçek zamanlı <br /> 
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">kripto ve borsa</span> asistanınız.
          </p>
        </div>

        <button 
          onClick={onStartChat}
          className="group relative w-full overflow-hidden rounded-2xl bg-emerald-600 dark:bg-emerald-500 px-8 py-4 text-white transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl active:scale-95 shadow-lg shadow-emerald-500/20"
        >
          <span className="relative z-10 font-bold text-lg flex items-center justify-center gap-2">
            Sohbete Başla
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </button>
      </div>
      
      <p className="mt-10 text-xs font-semibold tracking-widest uppercase text-slate-400 opacity-70">
        Built for Beyond Technologies
      </p>
    </div>
  );
}