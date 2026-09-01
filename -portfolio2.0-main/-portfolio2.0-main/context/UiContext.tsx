import React, { createContext, useContext } from 'react';

// Global UI chrome controls (resume modal, search overlay, menu panel).
// State lives in App; this context just exposes the switches to any page.
export interface UiContextType {
  setResumeOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMenuOpen: (open: boolean) => void;
  chromeHidden: boolean;
  pulseChromeHidden: () => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export const UiProvider: React.FC<{ value: UiContextType; children: React.ReactNode }> = ({ value, children }) => (
  <UiContext.Provider value={value}>{children}</UiContext.Provider>
);

export const useUi = () => {
  const context = useContext(UiContext);
  if (!context) throw new Error('useUi must be used within a UiProvider');
  return context;
};
