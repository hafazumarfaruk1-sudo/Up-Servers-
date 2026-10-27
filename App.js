import React, { useState } from 'react';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState(null);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleOptionClick = (optionName) => {
    setActiveSection(optionName);
    alert(`আপনি সিলেক্ট করেছেন: ${optionName}`);
  };

  return (
    <div className={`app-container ${theme}`}>
      {/* উপরে এক লাইন লেখা: UP Servers */}
      <div className="up-servers-bar">
        <span>UP Servers</span>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 ডार्क' : '☀️ লাইট'}
        </button>
      </div>

      {/* নিচের সম্পূর্ণ স্ক্রিন জায়গা নিয়ে চারটি ভাগ (Grid Layout) */}
      <div className="dashboard-grid">
        {/* অপশন ১ */}
        <div 
          className="dashboard-card" 
          onClick={() => handleOptionClick('QR code scanner')}
        >
          <div className="card-icon">📷</div>
          <h3>QR code scanner</h3>
          <p>স্ক্যান করে দ্রুত তথ্য নিশ্চিত করুন</p>
        </div>

        {/* অপশন ২ */}
        <div 
          className="dashboard-card" 
          onClick={() => handleOptionClick('add new person')}
        >
          <div className="card-icon">➕</div>
          <h3>add new person</h3>
          <p>নতুন ব্যক্তি বা ডেটা যুক্ত করুন</p>
        </div>

        {/* অপশন ৩ */}
        <div 
          className="dashboard-card" 
          onClick={() => handleOptionClick('all person list')}
        >
          <div className="card-icon">📋</div>
          <h3>all person list</h3>
          <p>সকল ব্যক্তির তালিকা ও সার্চ করুন</p>
        </div>

        {/* অপশন ৪ */}
        <div 
          className="dashboard-card" 
          onClick={() => handleOptionClick('creating all card')}
        >
          <div className="card-icon">🪪</div>
          <h3>creating all card</h3>
          <p>সবগুলোর জন্য কার্ড তৈরি করুন</p>
        </div>
      </div>

      {/* ফুটার */}
      <footer className="footer">
        <p>&copy; ২০২৬ আমার অ্যাপ্লিকেশন। সর্বস্বত্ব সংরক্ষিত।</p>
      </footer>
    </div>
  );
}

export default App;
