import React, { createContext, useContext, useState, useEffect } from 'react';

interface PerformanceContextType {
  ecoMode: boolean;
  setEcoMode: (mode: boolean) => void;
  isLowEndDevice: boolean;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [ecoMode, setEcoModeState] = useState<boolean>(() => {
    // SSR safe check
    if (typeof window === 'undefined') return false;
    
    const saved = localStorage.getItem('portfolio-eco-mode');
    if (saved !== null) {
      return saved === 'true';
    }
    return false; // Default will be computed in useEffect based on device specs
  });

  useEffect(() => {
    // Run hardware/device detection on mount
    const ua = navigator.userAgent.toLowerCase();
    const isMobileUA = /iphone|ipad|ipod|android|blackberry|mini|windows\sphone|palm/i.test(ua);
    
    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 4;
    // Check device memory if available (supported in Chrome/Opera/Edge/Android)
    const memory = (navigator as any).deviceMemory || 8;
    
    const lowEnd = isMobileUA || cores < 4 || memory < 4;
    setIsLowEndDevice(lowEnd);

    // If there is no user preference saved, apply eco mode automatically for low-end systems
    const saved = localStorage.getItem('portfolio-eco-mode');
    if (saved === null && lowEnd) {
      setEcoModeState(true);
    }
  }, []);

  const setEcoMode = (mode: boolean) => {
    setEcoModeState(mode);
    localStorage.setItem('portfolio-eco-mode', String(mode));
  };

  return (
    <PerformanceContext.Provider value={{ ecoMode, setEcoMode, isLowEndDevice }}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};
