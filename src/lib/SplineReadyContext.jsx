import { createContext, useContext } from 'react';

/**
 * SplineReadyContext
 * ──────────────────
 * Provides two values to the tree:
 *   - splineReady : boolean  — true once the <spline-viewer> fires its "load" event
 *   - setSplineReady : fn    — called by Spline3dModel when the model is loaded
 */
export const SplineReadyContext = createContext({
  splineReady: false,
  setSplineReady: () => {},
});

export const useSplineReady = () => useContext(SplineReadyContext);
