import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Components/Header.jsx';
import AppRoutes from './Routes/AppRoutes.jsx';
import Footer from './Components/Footer.jsx';
import SplashScreen from './Components/SplashScreen.jsx';
import ScrollToTop from './Components/ScrollToTop.jsx';
import Home from './Pages/Home.jsx';
import { SplineReadyContext } from './lib/SplineReadyContext.jsx';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [splineReady, setSplineReady] = useState(false);
  const { pathname } = useLocation();

  return (
    <SplineReadyContext.Provider value={{ splineReady, setSplineReady }}>
      <ScrollToTop />
      
      {/* Persistently mount Home page to cache the ScooterModel and preserve scroll/animation states */}
      <div style={{ display: pathname === '/' ? 'block' : 'none' }}>
        <Home />
      </div>

      {showSplash && (
        <SplashScreen
          modelLoaded={splineReady}
          onFinish={() => setShowSplash(false)}
        />
      )}
      <Header />
      {pathname !== '/' && <AppRoutes />}
      <Footer />
    </SplineReadyContext.Provider>
  );
};

export default App;