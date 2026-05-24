import React, { useRef, useEffect } from 'react';
import { useSplineReady } from '../lib/SplineReadyContext';

const SplineViewer = () => {
  const viewerRef = useRef(null);
  const { setSplineReady } = useSplineReady();

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;

    // Set the scene URL
    el.setAttribute(
      'url',
      'https://prod.spline.design/R-jKvUf2GU9zQJOA/scene.splinecode'
    );

    // The <spline-viewer> web component fires a 'load' event when the 3D
    // scene is fully parsed and rendered for the first time.
    const handleLoad = () => setSplineReady(true);
    el.addEventListener('load', handleLoad);

    return () => el.removeEventListener('load', handleLoad);
  }, [setSplineReady]);

  return (
    <div className="w-full h-full xl:h-screen">
      <spline-viewer ref={viewerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default SplineViewer;
