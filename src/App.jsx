import React, { useState } from 'react';
import Header from './Components/Header.jsx';
import AppRoutes from './Routes/AppRoutes.jsx';
import Footer from './Components/Footer.jsx';
import SplashScreen from './Components/SplashScreen.jsx';
import { SplineReadyContext } from './lib/SplineReadyContext.jsx';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [splineReady, setSplineReady] = useState(false);

  return (
    <SplineReadyContext.Provider value={{ splineReady, setSplineReady }}>
      {showSplash && (
        <SplashScreen
          modelLoaded={splineReady}
          onFinish={() => setShowSplash(false)}
        />
      )}
      <Header />
      <AppRoutes />
      <Footer />
    </SplineReadyContext.Provider>
  );
};

export default App;