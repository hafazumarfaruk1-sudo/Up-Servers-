import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app-container ${theme}`}>
      {/* নেভিগেশন বার */}
      <nav className="navbar">
        <div className="logo">আমার অ্যাপ</div>
        <ul className="nav-links">
          <li><a href="#home">হোম</a></li>
          <li><a href="#features">বৈশিষ্ট্যসমূহ</a></li>
          <li><a href="#counter">কাউন্টার</a></li>
          <li><a href="#contact">যোগাযোগ</a></li>
        </ul>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 ডार्क মোড' : '☀️ লাইট মোড'}
        </button>
      </nav>

      {/* হিরো সেকশন */}
      <header id="home" className="hero-section">
        <h1>স্বাগতম আমাদের নতুন অ্যাপ্লিকেশনে</h1>
        <p>এটি একটি আধুনিক, রেসপন্সিভ এবং ব্যবহারকারী-বান্ধব ওয়েব অ্যাপ্লিকেশন।</p>
        <button className="cta-button" onClick={() => alert('ধন্যবাদ আমাদের সাথে যুক্ত হওয়ার জন্য!')}>
          শুরু করুন
        </button>
      </header>

      {/* ফিচার সেকশন */}
      <section id="features" className="features-section">
        <h2>আমাদের মূল বৈশিষ্ট্যসমূহ</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>⚡ দ্রুত গতি</h3>
            <p>অত্যন্ত দ্রুত এবং অপ্টিমাইজড পারফরম্যান্স প্রদান করে।</p>
          </div>
          <div className="card">
            <h3>🎨 আধুনিক ডিজাইন</h3>
            <p>আকর্ষণীয় ইউজার ইন্টারফেস এবং ডার্ক/লাইট মোড সুবিধা।</p>
          </div>
          <div className="card">
            <h3>🔒 নিরাপদ</h3>
            <p>আপনার ডেটা সুরক্ষায় সর্বাধুনিক প্রযুক্তি ব্যবহৃত হয়েছে।</p>
          </div>
        </div>
      </section>

      {/* কাউন্টার সেকশন (ইন্টারঅ্যাক্টিভ কম্পোনেন্ট) */}
      <section id="counter" className="counter-section">
        <h2>ইন্টারঅ্যাক্টিভ কাউন্টার</h2>
        <div className="counter-box">
          <p>বর্তমান মান: <strong>{count}</strong></p>
          <div className="counter-buttons">
            <button onClick={() => setCount(count + 1)}>বৃদ্ধি করুন (+)</button>
            <button onClick={() => setCount(count - 1)} disabled={count === 0}>হ্রাস করুন (-)</button>
            <button className="reset-btn" onClick={() => setCount(0)}>রিসেট</button>
          </div>
        </div>
      </section>

      {/* ফুটার */}
      <footer id="contact" className="footer">
        <p>&copy; ২০২৬ আমার অ্যাপ্লিকেশন। সর্বস্বত্ব সংরক্ষিত।</p>
        <p>যোগাযোগ: support@myapp.com</p>
      </footer>
    </div>
  );
}

export default App;
