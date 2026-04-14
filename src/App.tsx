import { useState } from 'react';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

function App() {
  const [view, setView] = useState<'home' | 'chat'>('home');

  return (
    <div className="dark">
      {view === 'home' ? (
        <div onClick={() => setView('chat')}>
           {/* HomePage içindeki butona tıklandığında setView tetiklenecek */}
          <HomePage />
        </div>
      ) : (
        <ChatPage />
      )}
    </div>
  );
}

export default App;