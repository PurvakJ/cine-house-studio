import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import FAQs from './pages/FAQs';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
import './styles/main.css';

// ScrollToTop component that handles scrolling to top on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // This adds smooth scrolling effect
    });
  }, [pathname]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = () => {
    setLoading(false);
  };

  // Optional: Preload any critical assets here
  useEffect(() => {
    // Preload images or other assets if needed
    const preloadAssets = async () => {
      // Add any preloading logic here
    };
    
    preloadAssets();
  }, []);

  return (
    <AuthProvider>
      <Router>
        {loading && <Loader onComplete={handleLoaderComplete} />}
        <ScrollToTop />
        <div className="app" style={{ display: loading ? 'none' : 'block' }}>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;